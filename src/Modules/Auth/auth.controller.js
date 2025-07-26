import { Router } from "express";
import { errorHandlerMiddleware } from "../../Middleware/index.middleware.js";
import { signUpService, signInService } from "./services/auth.service.js";

const authController = Router();

/* == signUpController == */
authController.post("/sign-up", errorHandlerMiddleware(signUpService));
/* == signInController == */
authController.post("/sign-in", errorHandlerMiddleware(signInService));

export { authController };
