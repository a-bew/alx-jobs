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
import bcrypt from 'bcrypt';
import { messages } from "../../constants";

export const resetPasswordHandler = asyncWrapper(async (req: Request | any, res: Response, next: NextFunction) => {

    try {
    const { email, newPassword, resetToken } = req.body; // Get email, new password, and token from the request body

    // Check if the user exists
    const user = await userService.findUserByEmail(email);
    if (!user) {
        return sendError(res, createHttpError(404, "User not found"));
    }

    // Verify if the reset token is valid and has not expired
    // Use the same secret used to sign the token
    // const secret = `${user.password}-${user.createdAt}`; // Make sure to match this with how you generate it
    let payload;

    
    try {
        // Verify the token
        // payload = jwt.verify(resetToken, secret);
        // const decoded: any = jwt.verify(resetToken, config.accessTokenPrivateKey); // Make sure to handle JWT_SECRET properly
        payload = jwt.verify(resetToken, config.resetPasswordAccessTokenPrivateKey); // Make sure to handle JWT_SECRET properly

    } catch (error) {
        return sendError(res, createHttpError(400, "Invalid or expired token"));
    }

    // Check if the reset token has expired
    // const now = new Date();
    // const resetTokenExpiration = user.resetPasswordExpires || new Date(0);
    // if (now > resetTokenExpiration) {
    //     return sendError(res, createHttpError(400, "Reset token has expired"));
    // }

    const now = new Date();
    const resetTokenExpiration = new Date(user.resetPasswordExpires || new Date(0));
    console.log(resetTokenExpiration, "resetTokenExpiration");
    console.log(user.resetPasswordExpires, "user.resetPasswordExpires");
    console.log(now, "now");
    if (now.getTime() > resetTokenExpiration.getTime()) {
    return sendError(res, createHttpError(400, "Reset token has expired"));
    }


    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user record with the new password and clear the reset token and expiration
    await userService.findAndUpdateUserById({
        id: user.id,
        password: hashedPassword,
        resetPasswordToken: undefined,
        resetPasswordExpires: undefined,
    });

    return sendResponse(res, { message: "Password has been reset successfully" }, 200);

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