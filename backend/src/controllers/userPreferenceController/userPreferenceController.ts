import { Request, Response } from 'express';
import { asyncWrapper } from '../utils/asyncWrapper';
import createHttpError from 'http-errors';
import { messages } from '../../constants';
import { userPreferenceService } from '../../services/UserService/UserPreferenceService';
import { sendError, sendResponse } from '../../helpers';

// GET request handler for fetching user preferences
export const getUserPreferences = asyncWrapper(async (req: Request, res: Response) => {
    const {userId}:any = req; // Assuming `req.user` contains the authenticated user's ID
    try {
      if (!userId) {
          throw createHttpError(403, messages.CANNOT_RETRIEVE_USER_DATA);
        }
        const preferences = await userPreferenceService.getUserPreferences(userId);
        return sendResponse(res, preferences, 200);
    } catch (error:any) {
      return sendError(res, createHttpError(500, error.message));
    }
});

// POST request handler for setting or updating user preferences
export const setUserPreferences = asyncWrapper(async (req: Request, res: Response) => {
  const {userId}:any = req; // Assuming `req.user` contains the authenticated user's ID

    try {
    if (!userId) {
        throw createHttpError(403, messages.CANNOT_RETRIEVE_USER_DATA);
    }

    const { industries, locations, jobTypes, salaryRange, experienceLevel, remotePreference, keywords } = req.body;

    const updatedPreferences = await userPreferenceService.setUserPreferences(userId, {
      industries,
      locations,
      jobTypes,
      salaryRange,
      experienceLevel,
      remotePreference,
      keywords,
    });

    return sendResponse(res, updatedPreferences, 200);
  } catch (error: any) {
    return sendError(res, createHttpError(500, error.message));
  }
});