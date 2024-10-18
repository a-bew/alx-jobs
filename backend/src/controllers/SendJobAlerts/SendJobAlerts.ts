import { Request, Response } from "express";
// import { jobAlertService } from "../../services/JobService/JobAlertService";
import { sendResponse, sendError } from "../../helpers";
import createHttpError from 'http-errors';
import { jobAlertService } from "../../services/JobAlertService/JobAlertService";
import JobModel, { IJob } from "../../database/Job";


// Trigger job alerts after a job is posted
export const sendJobAlerts = async (req: Request, res: Response) => {
    const jobId = req.params.jobId as string;

    try {
      await jobAlertService.sendJobAlertsForNewPosting(jobId); // Directly call the service
      return sendResponse(res, { message: "Job alerts sent successfully" }, 200);
    } catch (error) {
    return sendError(res, createHttpError(500, "Failed to send job alerts"));
  }
};

// Controller to create a new job posting
export const createJobPosting = async (req: Request, res: Response) => {
    const jobData = req.body;
  
    try {
      const newJob = new JobModel(jobData);
      await newJob.save();
  
      // Create a mock request object to pass to sendJobAlerts
    const mockRequest: Request = {
        ...req, // Spread the original request
        params: {
            jobId: newJob._id, // Ensure jobId is a string
        },
    } as unknown as Request; // Assert that it is a Request type
      
      // Send job alerts to users whose preferences match the job
      await sendJobAlerts(mockRequest, res);  // Trigger job alerts
  
      return sendResponse(res, newJob, 201);
    } catch (error) {
      return sendError(res, createHttpError(500, "Failed to create job"));
    }
  };