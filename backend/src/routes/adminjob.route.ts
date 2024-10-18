import { Router } from 'express';
import { postJob, updateJob, deleteJob } from '../controllers/AdminController/AdminJobController';
import { deactivateUser, reactivateUser } from '../controllers/AdminController/AdminUserController';
import { approveJobListing, rejectJobListing } from '../controllers/AdminController/AdminJobModerationController';
import { getJobApplicationStats } from '../controllers/AdminController/AdminStatsController';
import { authVerifier } from '../middleware/authVerifier';
import { UserAccessLevel } from '../types';
import { createJobPosting } from "../controllers/SendJobAlerts/SendJobAlerts";

const router = Router();

// Route to post a new job (Admin only)
router.post('/jobs', authVerifier.verifyAccessToken, authVerifier.roleAuthorization(UserAccessLevel.ADMIN), postJob);

// Route to update an existing job (Admin only)
router.put('/jobs/:jobId', authVerifier.verifyAccessToken, authVerifier.roleAuthorization(UserAccessLevel.ADMIN), updateJob);

// Route to delete a job (Admin only)
router.delete('/jobs/:jobId', authVerifier.verifyAccessToken, authVerifier.roleAuthorization(UserAccessLevel.ADMIN), deleteJob);

// Route to deactivate a user account (Admin only)
router.put('/users/:userId/deactivate', authVerifier.verifyAccessToken, authVerifier.verifyAccessToken, authVerifier.roleAuthorization(UserAccessLevel.ADMIN), deactivateUser);

// Route to reactivate a user account (Admin only)
router.put('/users/:userId/reactivate', authVerifier.verifyAccessToken, authVerifier.roleAuthorization(UserAccessLevel.ADMIN), reactivateUser);

// Route to approve a job listing (Admin only)
router.put('/jobs/:jobId/approve', authVerifier.verifyAccessToken, authVerifier.roleAuthorization(UserAccessLevel.ADMIN), approveJobListing);

// Route to reject a job listing (Admin only)
router.put('/jobs/:jobId/reject', authVerifier.verifyAccessToken, authVerifier.roleAuthorization(UserAccessLevel.ADMIN), rejectJobListing);

// Route to fetch job application stats (Admin only)
router.get('/stats/applications', authVerifier.verifyAccessToken, authVerifier.roleAuthorization(UserAccessLevel.ADMIN), getJobApplicationStats);

// Route to post a new job and automatically alert user by email
router.post("/jobs", authVerifier.verifyAccessToken, authVerifier.roleAuthorization(UserAccessLevel.ADMIN), createJobPosting);


export default router;
