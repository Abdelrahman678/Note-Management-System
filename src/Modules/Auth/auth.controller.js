import { Router } from "express";
import { errorHandlerMiddleware } from "../../Middleware/index.middleware.js";
import { signUpService } from "./services/auth.service.js";

const authController = Router();

/* == signUpController == */
authController.post("/sign-up", errorHandlerMiddleware(signUpService));

export { authController };
