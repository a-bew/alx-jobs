import { Request, Response } from 'express';
import { asyncWrapper } from '../utils/asyncWrapper';
import createHttpError from 'http-errors';
import { messages } from '../../constants';
import { sendError, sendResponse } from '../../helpers';
import { jobApplicationService } from '../../services/JobService/JobApplicationService';
import { jobService } from '../../services/JobService/JobService';


// POST: Submit a job application
export const submitJobApplication = asyncWrapper(async (req: Request, res: Response) => {
    const { jobId } = req.params;
    const {userId}:any = req; // Assuming user ID is available via authentication middleware

    try {
  
      if (!userId ) {
        throw createHttpError(403, messages.CANNOT_RETRIEVE_USER_DATA);
      }
  
      const { coverLetter, resumeUrl } = req.body;
  
      const job:any = await jobService.getJobDetails(jobId); // Fetch job to get company info
      const companyId = job.company._id;
  
      const application = await jobApplicationService.submitJobApplication({jobId, userId, companyId, coverLetter, resumeUrl});
  
      return sendResponse(res, application, 201);
    
    } catch (error: any) {

      return sendError(res, createHttpError(500, error.message));

    }
  });


// GET: View all applications by user
export const viewUserApplications = asyncWrapper(async (req: Request, res: Response) => {

    const {userId}:any = req; // Assuming user ID is available via authentication middleware

    try {
  
      if (!userId ) {
        throw createHttpError(403, messages.CANNOT_RETRIEVE_USER_DATA);
      }

      const applications = await jobApplicationService.getUserApplications(userId);
  
      return sendResponse(res, applications, 200);
    } catch (error:any) {
      return sendError(res, createHttpError(500, error.message));
    }
  });

// GET: View application details by application ID
export const viewApplicationWithDetails = asyncWrapper(async (req: Request, res: Response) => {
    const { applicationId } = req.params;  // Assuming application ID is passed as a route parameter

    try {
        if (!applicationId) {
            throw createHttpError(400, messages.INVALID_APPLICATION_ID);  // Custom error for missing ID
        }

        const applicationDetails = await jobApplicationService.getApplicationWithDetails(applicationId);

        if (!applicationDetails) {
            throw createHttpError(404, messages.APPLICATION_NOT_FOUND);  // Custom error for not found
        }

        return sendResponse(res, applicationDetails, 200);
    } catch (error: any) {
        return sendError(res, createHttpError(500, error.message));  // General error handling
    }
});

// POST: Withdraw an application
export const withdrawApplication = asyncWrapper(async (req: Request, res: Response) => {
    const { applicationId } = req.params;  // Get applicationId from route parameters

    try {
        if (!applicationId) {
            throw createHttpError(400, messages.INVALID_APPLICATION_ID);  // Check for invalid or missing ID
        }

        const updatedApplication = await jobApplicationService.withdrawApplication(applicationId);

        if (!updatedApplication) {
            throw createHttpError(404, messages.APPLICATION_NOT_FOUND);  // If the application is not found
        }

        return sendResponse(res, updatedApplication, 200);  // Send the updated application with status 'withdrawn'
    } catch (error: any) {
        return sendError(res, createHttpError(500, error.message));  // Handle errors
    }
});