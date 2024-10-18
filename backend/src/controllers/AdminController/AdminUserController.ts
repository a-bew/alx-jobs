import { asyncWrapper } from 'controllers/utils/asyncWrapper';
import { Request, Response } from 'express';
import { sendError, sendResponse } from 'helpers';
// import { asyncWrapper } from '../middlewares/asyncWrapper';
// import { adminUserService } from '../services/AdminUserService';
import createHttpError from 'http-errors';
import { adminUserService } from 'services/AdminService/AdminUserService';
// import { sendResponse, sendError } from '../helpers/response';

// PUT: Admin deactivates a user account
export const deactivateUser = asyncWrapper(async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const deactivatedUser = await adminUserService.deactivateUser(userId);
    return sendResponse(res, deactivatedUser, 200);
  } catch (error: any) {
    return sendError(res, createHttpError(500, error.message));
  }
});

// PUT: Admin reactivates a deactivated user account
export const reactivateUser = asyncWrapper(async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const reactivatedUser = await adminUserService.reactivateUser(userId);
    return sendResponse(res, reactivatedUser, 200);
  } catch (error: any) {
    return sendError(res, createHttpError(500, error.message));
  }
});
