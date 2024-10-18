import { getUserPreferences, setUserPreferences } from "../controllers/userPreferenceController/userPreferenceController";
import { Router } from "express";
import { validators } from "../middleware/validators";
import { authVerifier } from "../middleware/authVerifier";
import { submitJobApplication, viewApplicationWithDetails, viewUserApplications, withdrawApplication } from "../controllers/JobApplicationController/JobApplicationController";


const router = Router();

// POST: Submit a job application
router.post('/:jobId/apply', authVerifier.verifyAccessToken, submitJobApplication);

// GET: View all job applications by the user
router.get('/user/applications', authVerifier.verifyAccessToken, viewUserApplications);

// GET: View all job applications by the applicationId (company based view)
router.get('/applications/:applicationId', authVerifier.verifyAccessToken, viewApplicationWithDetails);

// Route for withdrawing an application (assuming applicationId is a route parameter)
router.post('/applications/:applicationId/withdraw', authVerifier.verifyAccessToken, withdrawApplication);
//Usage -> POST /applications/60f73c27d4fd1a2f3c7b8e65/withdraw






export default router;