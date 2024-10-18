import { asyncWrapper } from 'controllers/utils/asyncWrapper';
import { Request, Response } from 'express';
import { sendError, sendResponse } from 'helpers';
import createHttpError from 'http-errors';
import { adminJobService } from '../../services/AdminService/AdminJobService';

// POST: Admin posts a new job listing
export const postJob = asyncWrapper(async (req: Request, res: Response) => {
  const { title, description, requirements, salaryRange, location, jobType, company } = req.body;

  try {

    const newJob = await adminJobService.postNewJob({
      title,
      description,
      requirements,
      salaryRange,
      location,
      jobType,
      company,
    });

    return sendResponse(res, newJob, 201);

  } catch (error: any) {
    return sendError(res, createHttpError(500, error.message));
  }
  
});

// PUT: Admin updates an existing job listing
export const updateJob = asyncWrapper(async (req: Request, res: Response) => {
  const { jobId } = req.params;
  const { title, description, requirements, salaryRange, location, jobType, company } = req.body;

  try {
    const updatedJob = await adminJobService.updateJob(jobId, {
      title,
      description,
      requirements,
      salaryRange,
      location,
      jobType,
      company,
    });

    return sendResponse(res, updatedJob, 200);

  } catch (error: any) {

    return sendError(res, createHttpError(500, error.message));

  }
});

// DELETE: Admin deletes a job listing
export const deleteJob = asyncWrapper(async (req: Request, res: Response) => {
  const { jobId } = req.params;

  try {
    const deletedJob = await adminJobService.deleteJob(jobId);

    return sendResponse(res, deletedJob, 200);
  } catch (error: any) {
    return sendError(res, createHttpError(500, error.message));
  }
});