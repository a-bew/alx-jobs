import { getAllJobs, getForYouJobs, getJobDetails, searchJobs } from '../controllers/JobController/JobController';
import { Router } from 'express';
import { authVerifier } from '../middleware/authVerifier';

const router = Router();

router.get('/for-you', authVerifier.verifyAccessToken, getForYouJobs); // Curated jobs for the user
router.get('/all', authVerifier.verifyAccessToken, getAllJobs);        // All active jobs
router.get('/search', authVerifier.verifyAccessToken, searchJobs);     // Search jobs
router.get('/:jobId', authVerifier.verifyAccessToken, getJobDetails); // Get detailed information about a job by jobId


export default router;



