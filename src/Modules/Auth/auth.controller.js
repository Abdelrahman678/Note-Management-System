import { Router } from "express";
import { errorHandlerMiddleware } from "../../Middleware/index.middleware.js";
import {
  signUpService,
  signInService,
  signOutService,
  forgotPasswordService,
  resetPasswordService,
  refreshTokenService,
} from "./services/auth.service.js";

const authController = Router();

/* == signUpController == */
authController.post("/sign-up", errorHandlerMiddleware(signUpService));
/* == signInController == */
authController.post("/sign-in", errorHandlerMiddleware(signInService));
/* == signOutController == */
authController.post("/sign-out", errorHandlerMiddleware(signOutService));
/* == forgotPasswordController == */
authController.patch(
  "/forgot-password",
  errorHandlerMiddleware(forgotPasswordService)
);
/* == resetPasswordController == */
authController.put(
  "/reset-password",
  errorHandlerMiddleware(resetPasswordService)
);
/* == refreshTokenController == */
authController.post(
  "/refresh-token",
  errorHandlerMiddleware(refreshTokenService)
);

export { authController };
