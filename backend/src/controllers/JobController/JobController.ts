import { Request, Response } from 'express';
import { asyncWrapper } from '../utils/asyncWrapper';
import createHttpError from 'http-errors';
import { messages } from '../../constants';
import { sendError, sendResponse } from '../../helpers';
import { jobService } from '../../services/JobService/JobService';

// GET: Fetch curated jobs based on user preferences
export const getForYouJobs = asyncWrapper(async (req: Request, res: Response) => {

    const {userId}:any = req; // Assuming `req.user` contains the authenticated user's ID

    try {
        if (!userId) {
            throw createHttpError(403, messages.CANNOT_RETRIEVE_USER_DATA);
        }
      
        const jobs = await jobService.getForYouJobs(userId);

      return sendResponse(res, jobs, 200);

    } catch (error: any) {

      return sendError(res, createHttpError(500, error.message));

    }
  });
  
  // GET: Fetch all active job listings
  export const getAllJobs = asyncWrapper(async (req: Request, res: Response) => {
    try {
      const jobs = await jobService.getAllJobs();
      return sendResponse(res, jobs, 200);
    } catch (error:any) {
      return sendError(res, createHttpError(500, error.message));
    }
  });
  
  // GET: Search jobs based on query
  export const searchJobs = asyncWrapper(async (req: Request, res: Response) => {
    try {
      const query = req.query.query as string;
      if (!query) {
        return sendError(res, createHttpError(400, 'Search query is required'));
      }
  
      const jobs = await jobService.searchJobs(query);
      return sendResponse(res, jobs, 200);
    } catch (error:any) {
      return sendError(res, createHttpError(500, error.message));
    }
  });


  // GET: Retrieve job details by jobId
export const getJobDetails = asyncWrapper(async (req: Request, res: Response) => {
    try {
      const { jobId } = req.params; // Extract the jobId from the request URL
      const jobDetails = await jobService.getJobDetails(jobId);
  
      if (!jobDetails) {
        return sendError(res, createHttpError(404, 'Job not found'));
      }
  
      return sendResponse(res, jobDetails, 200);
    } catch (error: any) {
      return sendError(res, createHttpError(500, error.message));
    }
  });