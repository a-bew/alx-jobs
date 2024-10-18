import { asyncWrapper } from 'controllers/utils/asyncWrapper';
import { Request, Response } from 'express';
import { sendError, sendResponse } from 'helpers';
import { jobApplicantService } from 'services/CompanyService/JobApplicantService';


// Fetch applicants for a specific job
export const getApplicantsForJob = asyncWrapper(async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;
    const applicants = await jobApplicantService.getApplicantsForJob(jobId);
    
    const responseData = applicants.map(app => jobApplicantService.convertApplicationDocToApplicantResponse(app));
    
    return sendResponse(res, { message: 'Applicants fetched successfully', data: responseData });

} catch (error:any) {

    return sendError(res, error);

}
});

// View details of a specific applicant
export const getApplicantDetails = asyncWrapper(async (req: Request, res: Response) => {
  try {
    const { applicantId } = req.params;
    const applicantDetails = await jobApplicantService.getApplicantDetails(applicantId);
    
    const responseData = jobApplicantService.convertApplicationDocToApplicantResponse(applicantDetails);
    
    return sendResponse(res, { message: 'Applicant details fetched successfully', data: responseData });

  } catch (error:any) {

    return sendError(res, error);

  }
});
