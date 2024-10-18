import { Router } from "express";


import { validators } from "../middleware/validators";
import  authController from '../controllers/UserAuthController';
import { authVerifier } from "../middleware/authVerifier";
import { resetPasswordHandler } from "../controllers/UserAuthController/resetPassword";
import { forgotPasswordHandler } from "../controllers/UserAuthController/forgetPassword";
import { verifyEmailController } from "../controllers/UserAuthController/registerController";
import { updatePasswordHandler } from "../controllers/UserAuthController/updatePasswordController";

const router = Router();

router.post('/verify-email', verifyEmailController);
router.post("/refresh", authVerifier.verifyRefreshToken, authController.refreshToken);
router.post('/forget-password', validators.forgetPasswordValidationRules, validators.validate, forgotPasswordHandler);
router.post('/reset-password', 
    validators.resetPasswordValidationRules, validators.validate, 
     resetPasswordHandler);
// 
router.post("/login", validators.loginValidationRules, validators.validate, authController.login);

router.post(
  "/register",
  validators.registerValidationRules,
  validators.validate,
  authController.register
);

router.post("/update-password", validators.updatePasswordValidationRules, validators.validate,   
  authVerifier.verifyAccessToken, updatePasswordHandler);

router.post("/logout", authVerifier.verifyAccessToken, authController.logout);

// router.get("/profile", authVerifier.verifyAccessToken, authController.getProfile);

// router.patch(
//   "/profile",
//   authVerifier.verifyAccessToken,
//   validators.updateProfileValidationRules,
//   validators.validate,
//   authController.updateProfile,
// );

export default router;