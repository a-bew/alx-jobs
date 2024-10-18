import { Request, Response } from 'express';
import createHttpError from 'http-errors';
import { sendResponse, sendError } from '../../helpers/response';
import { asyncWrapper } from '../../controllers/utils/asyncWrapper';
import { adminJobModerationService } from '../../services/AdminService/AdminJobModerationService';

// PUT: Admin approves a job listing
export const approveJobListing = asyncWrapper(async (req: Request, res: Response) => {
  const { jobId } = req.params;

  try {
    const approvedJob = await adminJobModerationService.approveJob(jobId);
    return sendResponse(res, approvedJob, 200);
  } catch (error: any) {
    return sendError(res, createHttpError(500, error.message));
  }
});

// PUT: Admin rejects a job listing
export const rejectJobListing = asyncWrapper(async (req: Request, res: Response) => {
  const { jobId } = req.params;

  try {
    const rejectedJob = await adminJobModerationService.rejectJob(jobId);
    return sendResponse(res, rejectedJob, 200);
  } catch (error: any) {
    return sendError(res, createHttpError(500, error.message));
  }
});