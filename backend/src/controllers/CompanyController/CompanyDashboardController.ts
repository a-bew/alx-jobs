import { Request, Response } from "express";
import createHttpError from 'http-errors';
import { companyDashboardService } from "services/CompanyService/CompanyDashboardService";
import { asyncWrapper } from "../../controllers/utils/asyncWrapper";
import { sendResponse, sendError } from "../../helpers";

// Controller to fetch jobs by company ID
export const getCompanyJobs = asyncWrapper(async (req: Request, res: Response) => {
  const companyId = req.params.companyId;

  try {
    const jobs = await companyDashboardService.getJobsByCompanyId(companyId);

    return  sendResponse(res, jobs, 200);
  } catch (error) {
  //  return sendError(res, 500, "Failed to fetch jobs for company");
  return sendError(res, createHttpError(500, "Failed to fetch jobs for company"));

  }
});

// Controller to fetch applications for a specific job
export const getJobApplications = asyncWrapper(async (req: Request, res: Response) => {
  const jobId = req.params.jobId;

  try {
    const applications = await companyDashboardService.getApplicationsByJobId(jobId);
    sendResponse(res, applications, 200);
  } catch (error) {
    sendError(res, createHttpError(500, "Failed to fetch applications for the job"));
  }
});

// Controller to fetch the status of an applicant's application
export const getApplicantStatus = asyncWrapper(async (req: Request, res: Response) => {
  const { applicantId, jobId } = req.params;

  try {
    const application = await companyDashboardService.getApplicationStatusByApplicantId(applicantId, jobId);
    if (!application) {
      sendError(res, createHttpError(404, "Application not found"));
    } else {
      sendResponse(res, 200, application);
    }
  } catch (error) {
    sendError(res, createHttpError(500, "Failed to fetch applicant status"));
  }
});

// Controller to update job status
export const updateJobStatus = asyncWrapper(async (req: Request, res: Response) => {
  const jobId = req.params.jobId;
  const { status } = req.body;

  try {
    const updatedJob = await companyDashboardService.updateJobStatus(jobId, status);
    if (!updatedJob) {
      sendError(res, createHttpError(404, "Job not found"));
    } else {
      sendResponse(res, 200, updatedJob);
    }
  } catch (error) {
    sendError(res, createHttpError(500, "Failed to update job status"));
  }
});