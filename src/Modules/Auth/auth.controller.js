import { Router } from "express";
import {
  errorHandlerMiddleware,
  validationMiddleware,
} from "../../Middleware/index.middleware.js";
import {
  signUpService,
  signInService,
  signOutService,
  forgotPasswordService,
  resetPasswordService,
  refreshTokenService,
} from "./services/auth.service.js";
import {
  signUpSchema,
  signInSchema,
  forgetPasswordSchema,
  resetPasswordSchema,
  refreshTokenSchema,
} from "../../Validators/auth.schema.js";
const authController = Router();

/* == signUpController == */
authController.post(
  "/sign-up",
  validationMiddleware(signUpSchema),
  errorHandlerMiddleware(signUpService)
);
/* == signInController == */
authController.post(
  "/sign-in",
  validationMiddleware(signInSchema),
  errorHandlerMiddleware(signInService)
);
/* == signOutController == */
authController.post("/sign-out", errorHandlerMiddleware(signOutService));
/* == forgotPasswordController == */
authController.patch(
  "/forgot-password",
  validationMiddleware(forgetPasswordSchema),
  errorHandlerMiddleware(forgotPasswordService)
);
/* == resetPasswordController == */
authController.put(
  "/reset-password",
  validationMiddleware(resetPasswordSchema),
  errorHandlerMiddleware(resetPasswordService)
);
/* == refreshTokenController == */
authController.post(
  "/refresh-token",
  validationMiddleware(refreshTokenSchema),
  errorHandlerMiddleware(refreshTokenService)
);

export { authController };
