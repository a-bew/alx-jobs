import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import createHttpError from "http-errors";
import { asyncWrapper } from "../utils/asyncWrapper"; // Your async error handler
import { userService } from "../../services/UserService/userService"; // Your user service
import { sendError, sendResponse } from "../../helpers";

export const updatePasswordHandler = asyncWrapper(
  async (req: Request | any, res: Response, next: NextFunction) => {
    try {
      const { currentPassword, newPassword } = req.body;

      // Ensure user is authenticated and has user ID from JWT or session
      const userId = req.userId;

      if (!userId) {
        return sendError(res, createHttpError(401, "Unauthorized"));
      }

      // Fetch the user from the database
      const user = await userService.findUserById(userId);

      if (!user) {
        return sendError(res, createHttpError(404, "User not found"));
      }

      // Check if the current password is correct
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        return sendError(res, createHttpError(400, "Current password is incorrect"));
      }

      // Check if the new password is different from the current one
      if (await bcrypt.compare(newPassword, user.password)) {
        return sendError(res, createHttpError(400, "New password cannot be the same as the current password"));
      }

      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Update the user's password
      const updatedUser = await userService.findAndUpdateUserById({id:userId, password: hashedPassword});

      if (!updatedUser) {
        return sendError(res, createHttpError(500, "Unable to update password"));
      }

      // Send a success response
      return sendResponse(res, { message: "Password updated successfully" }, 200);
    } catch (err) {
      const error = err as Error;
      return sendError(res, createHttpError(500, error.message));
    }
  }
);
