import { Router } from 'express';
import { postNewJob, updateJob, deleteJob } from '../controllers/CompanyController/CompanyJobController';
import { companyLogin, companySignup } from '../controllers/CompanyController/CompanyAuthCountroller';
import { authVerifier } from '../middleware/authVerifier';
import { UserAccessLevel } from 'types';
import { getApplicantsForJob, getApplicantDetails } from '../controllers/CompanyController/JobApplicantController';
import { sendMessageToApplicant } from '../controllers/CompanyController/ApplicantMessagingController';
import { getApplicantStatus, getCompanyJobs, getJobApplications, updateJobStatus } from 'controllers/CompanyController/CompanyDashboardController';
import { cancelSubscription,  createSubscription, getCompanySubscription, updateSubscription } from 'controllers/CompanyController/SubscriptionController';


const router = Router();

// Route for company signup
router.post('/signup', companySignup);

// Route for company login
router.post('/login', companyLogin);

// Route to post a new job
router.post('/jobs', authVerifier.verifyAccessToken, authVerifier.roleAuthorization(UserAccessLevel.COMPANY), postNewJob);

// Route to update an existing job
router.put('/jobs/:jobId', authVerifier.verifyAccessToken, authVerifier.roleAuthorization(UserAccessLevel.COMPANY), updateJob);

// Route to delete a job
router.delete('/jobs/:jobId', authVerifier.verifyAccessToken, authVerifier.roleAuthorization(UserAccessLevel.COMPANY), deleteJob);

// Route for fetching applicants for a specific job
router.get('/jobs/:jobId/applicants', authVerifier.verifyAccessToken, authVerifier.roleAuthorization(UserAccessLevel.COMPANY), getApplicantsForJob);

// Route for viewing detailed profile of an applicant
router.get('/applicants/:applicantId', authVerifier.verifyAccessToken, authVerifier.roleAuthorization(UserAccessLevel.COMPANY), getApplicantDetails);

// Route for sending message to an applicant
router.post('/applicants/:applicantId/message', authVerifier.verifyAccessToken, authVerifier.roleAuthorization(UserAccessLevel.COMPANY), sendMessageToApplicant);


// Route to get all jobs for a specific company by company ID
router.get("/dashboard/company/:companyId/jobs", authVerifier.verifyAccessToken, authVerifier.roleAuthorization(UserAccessLevel.COMPANY), getCompanyJobs);

// Route to get applications for a specific job by job ID
router.get("/jobs/:jobId/applications", authVerifier.verifyAccessToken, authVerifier.roleAuthorization(UserAccessLevel.COMPANY), getJobApplications);

// Route to get the status of an applicant's application for a specific job
router.get("/jobs/:jobId/applicants/:applicantId/status", authVerifier.verifyAccessToken, authVerifier.roleAuthorization(UserAccessLevel.COMPANY), getApplicantStatus);

// Route to update the status of a specific job by job ID
router.put("/jobs/:jobId/status", authVerifier.verifyAccessToken, authVerifier.roleAuthorization(UserAccessLevel.COMPANY), updateJobStatus);



router.post('/subscription', authVerifier.verifyAccessToken, authVerifier.roleAuthorization(UserAccessLevel.COMPANY),  createSubscription);  // Create a new subscription
router.get('/subscription/:companyId', authVerifier.verifyAccessToken, authVerifier.roleAuthorization(UserAccessLevel.COMPANY),  getCompanySubscription);  // Get subscription for a company
router.put('/subscription/', authVerifier.verifyAccessToken, authVerifier.roleAuthorization(UserAccessLevel.COMPANY),  updateSubscription);  // Update subscription
router.delete('/subscription/:companyId', authVerifier.verifyAccessToken, authVerifier.roleAuthorization(UserAccessLevel.COMPANY),  cancelSubscription);  // Cancel subscription

export default router;