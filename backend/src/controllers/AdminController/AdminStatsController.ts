import { Request, Response } from 'express';
import createHttpError from 'http-errors';
import { sendResponse, sendError } from '../../helpers/response';
import { asyncWrapper } from 'controllers/utils/asyncWrapper';
import { adminStatsService } from 'services/AdminService/AdminStatsService';

// GET: Admin fetches job application statistics
export const getJobApplicationStats = asyncWrapper(async (req: Request, res: Response) => {
  try {
    const stats = await adminStatsService.getJobApplicationStats();
    return sendResponse(res, stats, 200);
  } catch (error: any) {
    return sendError(res, createHttpError(500, error.message));
  }
});
