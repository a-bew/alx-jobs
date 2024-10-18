import { getUserPreferences, setUserPreferences } from "../controllers/userPreferenceController/userPreferenceController";
import { Router } from "express";
import { validators } from "../middleware/validators";
import  authController from '../controllers/UserAuthController';
import { authVerifier } from "../middleware/authVerifier";


const router = Router();

router.get('/preferences',  authVerifier.verifyAccessToken, getUserPreferences);
router.post('/preferences', authVerifier.verifyAccessToken, validators.validate, setUserPreferences);


export default router;