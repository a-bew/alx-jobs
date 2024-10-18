import { messages } from '../../constants';
import { asyncWrapper } from '../../controllers/utils/asyncWrapper';
import { Request, Response } from 'express';
import { sendError, sendResponse } from 'helpers';
import createHttpError from 'http-errors';
import { jobService } from '../../services/CompanyService/CompanyJobService';

// POST: Post a new job listing
export const postNewJob = asyncWrapper(async (req: Request, res: Response) => {
  const { userId: companyId } = req; // Assuming req.user contains authenticated company details
  const { title, description, requirements, salaryRange, location, jobType, isRemote } = req.body;

  if (!companyId ) {
    throw createHttpError(403, messages.CANNOT_RETRIEVE_USER_DATA);
  }

  if (!title || !description || !requirements || !location || !jobType) {
    return sendError(res, createHttpError(400, 'Missing required fields.'));
  }

  try {
    const newJob = await jobService.postNewJob(companyId, {
      title,
      description,
      requirements,
      salaryRange,
      location,
      jobType,
      isRemote,
    });

    return sendResponse(res, newJob, 201);

} catch (error: any) {
    return sendError(res, createHttpError(500, error.message));
  }
});

// PUT: Update an existing job listing
export const updateJob = asyncWrapper(async (req: Request, res: Response) => {
  const { userId: companyId} = req; // Assuming req.user contains authenticated company details
  const { jobId } = req.params;
  const { title, description, requirements, salaryRange, location, jobType, isRemote, listingStatus } = req.body;

  if (!companyId ) {
    throw createHttpError(403, messages.CANNOT_RETRIEVE_USER_DATA);
  }

  try {
    const updatedJob = await jobService.updateJob(companyId, jobId, {
      title,
      description,
      requirements,
      salaryRange,
      location,
      jobType,
      isRemote,
      listingStatus,
    });
    return sendResponse(res, updatedJob, 200);
  } catch (error: any) {
    return sendError(res, createHttpError(500, error.message));
  }
});

// DELETE: Delete a job listing
export const deleteJob = asyncWrapper(async (req: Request, res: Response) => {
  const { userId: companyId } = req; // Assuming req.user contains authenticated company details
  const { jobId } = req.params;

  if (!companyId ) {
    throw createHttpError(403, messages.CANNOT_RETRIEVE_USER_DATA);
  }

  try {
    const result = await jobService.deleteJob(companyId, jobId);
    return sendResponse(res, result, 200);
  } catch (error: any) {
    return sendError(res, createHttpError(500, error.message));
  }
});
