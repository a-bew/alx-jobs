import { Request, Response } from 'express';
import { asyncWrapper } from '../utils/asyncWrapper';
import createHttpError from 'http-errors';
import { messages } from '../../constants';
import { sendError, sendResponse } from '../../helpers';
import { userProfileService } from '../../services/UserService/UserProfileService';


// GET: View user profile
export const getUserProfile = asyncWrapper(async (req: Request, res: Response) => {
    const {userId}:any = req; // Assuming `req.user` contains the authenticated user's ID

    try {
        if (!userId) {
            throw createHttpError(403, messages.CANNOT_RETRIEVE_USER_DATA);
          }
      const profile = await userProfileService.getUserProfile(userId);
      return sendResponse(res, profile, 200);
    } catch (error:any) {
      return sendError(res, createHttpError(500, error.message));
    }
  });
  
  // PUT: Update user profile
  export const updateUserProfile = asyncWrapper(async (req: Request, res: Response) => {
    const {userId}:any = req;

    try {

      if (!userId) {
        throw createHttpError(403, messages.CANNOT_RETRIEVE_USER_DATA);
      }
      const { firstName, lastName, bio, qualifications, experience } = req.body;
  
      const updatedProfile = await userProfileService.updateUserProfile(userId, {
        firstName,
        lastName,
        bio,
        qualifications,
        experience,
      });
  
      return sendResponse(res, updatedProfile, 200);
    } catch (error:any) {
      return sendError(res, createHttpError(500, error.message));
    }
  });