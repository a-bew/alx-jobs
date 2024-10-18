import { Request, Response } from "express";
import createHttpError from "http-errors";

import { asyncWrapper } from "../utils/asyncWrapper";
import { logger, sendError, hashPassword, sendResponse } from "../../helpers";
import { userService } from "../../services/UserService/userService";
import { messages } from "../../constants";
import { publishTo } from "../../rabbitmq/publisher";
import { consumeFrom } from "../../rabbitmq/consumer";
import jwt from 'jsonwebtoken';
import sendEmail from "../../helpers/mailer/mailer";
import { config } from "../../config";

const registerController = asyncWrapper( async (req: Request, res: Response) => {

  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      logger.error('User already exists');
      // return res.status(409).json({ message: ' });
      return sendError(res, createHttpError(404, "User already exists"));
    }

    const hashedPassword = await hashPassword(password);

    const user = await userService.create(firstName, lastName, email, hashedPassword, 'user');

    // Generate verification token

    const verificationToken = jwt.sign({ id: user.id }, config.accessTokenPrivateKey, { expiresIn: '1h' });

    // Update user with verification token
    // await userService.findAndUpdateUserById({ id: user.id, verificationToken});

    await userService.findAndUpdateUserById({
      id: user.id,
      verificationToken,
      // resetPasswordExpires: now,
    });

    // Send verification email
    await sendEmail({
      from: 'no-reply@example.com',
      to: user.email,
      subject: 'Email Verification',
      html: `<p>Welcome ${firstName},</p>
            <p>Please verify your email by clicking the link below:</p>
            <a href=${config.CLIENT_URL}/verify-email/${verificationToken}>Verify Email</a>
            <p>This link will expire in 1 hour.</p>
            link: href=${config.CLIENT_URL}/verify-email/${verificationToken}
            `,
    });

    logger.debug(`Verification email sent to ${email}`);
    // return res.status(201).json({ message: 'Account created. Please verify your email.' });
    return sendResponse(res, { message: 'Account created. Please verify your email.' }, 201);

  } catch (err) {

    const error = err as Error;

    logger.error(error.message);

    // replace the default error response
    if (error.message === messages.INVALID_TOKEN || error.message === messages.NO_AUTH_TOKEN) {
      return sendError(res, createHttpError(401, error));
    }

    return sendError(res, error);
    
  }

});

export const verifyEmailController = asyncWrapper(async (req: Request, res: Response) => {

  try {
      
    const { token } = req.body; // Assuming the token is passed in the URL

    // Decode the token to get the user id
    const decoded: any = jwt.verify(token, config.accessTokenPrivateKey); // Make sure to handle JWT_SECRET properly

    const user = await userService.findUserById(decoded.id);

    if (!user) {
      return sendError(res, createHttpError(404, "User not found"));
    }

    // Update user's email verification status
    await userService.findAndUpdateUserById({id:user.id, emailVerified: true});

    logger.debug(`User ${user.email} has been verified.`);

    return sendResponse(res, { message: 'Email verified successfully!' }, 200);

  } catch (err) {

    const error = err as Error;

    logger.error(error.message);

    // replace the default error response
    if (error.message === messages.INVALID_TOKEN || error.message === messages.NO_AUTH_TOKEN) {
      return sendError(res, createHttpError(401, error));
    }

    return sendError(res, error);
    
  }

});


export default registerController;