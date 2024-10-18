import { Router } from 'express';
import { authVerifier } from '../middleware/authVerifier';
import { getUserProfile, updateUserProfile } from '../controllers/userPreferenceController/userProfileController';
import { validators } from '../middleware/validators';

const router = Router();

router.get('/profile',  authVerifier.verifyAccessToken, getUserProfile); // View profile
router.put('/profile', authVerifier.verifyAccessToken, validators.validate, updateUserProfile); // Update profile

export default router;