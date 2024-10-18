import { NextFunction, Request, Response } from "express";
import passport from "passport";
import createHttpError from "http-errors";
import { userTokenService } from "../../services/UserService/userTokenService";
import { asyncWrapper } from "../utils/asyncWrapper";
import { userService } from "../../services/UserService/userService";
import { logger, sendError, sendResponse } from "../../helpers";
import sendEmail from "../../helpers/mailer/mailer";
import jwt from "jsonwebtoken";
import {config} from "../../config";
import { messages } from "../../constants";

export const forgotPasswordHandler = asyncWrapper(async (req: Request|any, res: Response, next: NextFunction) => {

  try {

    const message  = 
    "If a user with that email is registered you will receive a password reset email";
  
    const { email } = req.body;
  
    const user = await userService.findUserByEmail(email);
  
    if (!user) {
      logger.error(`User with email ${email} does not exists`);
      return res.send(message);
    }
  
    if (!user.emailVerified) {
        return sendError(res, createHttpError(401, "User is not verified"));
    }

    const body = { id: user.id, email: user.email };

    var secret = `${user.password}-${user.createdAt}`;


    const payload = { id: user.id, role: user.role };

    // const accessToken = jwt.sign(payload, secret, {
    //     expiresIn: "5h",
    //   });

    const accessToken = jwt.sign(payload, config.resetPasswordAccessTokenPrivateKey, { expiresIn: "5h" });

    // add token to user
    let now = new Date();
    now.setMinutes(now.getMinutes() + 30); // timestamp
    now = new Date(now); // Date object

    const userToken = await userService.findAndUpdateUserById({
        id: user.id,
        resetPasswordToken: accessToken,
        resetPasswordExpires: now,
    });

    if (!userToken) {
      return sendError(res, createHttpError(500, "Something went wrong"));
    }

    const passwordResetCode = userToken.resetPasswordToken;

    // send email
    await sendEmail({
      from: "p0fNc@example.com",
      to: user.email,
      subject: "Password Reset",
      html: `
        <p>Hello ${user.firstName} ${user.lastName},</p>

        <p>You requested a password reset. </p>

        <p>Please click the link below to reset your password:</p>
          <a href=${config.CLIENT_URL}/reset-password/${passwordResetCode}>Reset Password</a>
          <p>This link will expire in 30 minutes.</p>
          <p>If you did not request a password reset, you can ignore this email.</p>
          <br>
          <p>Best regards,</p>
          <p>Your Support Team</p>
        `,
        });
  
    logger.debug(`Password reset email sent to ${email}`);
  
    return sendResponse(res, { message }, 200);

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

