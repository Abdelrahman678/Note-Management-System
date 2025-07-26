import { Router } from "express";
import { signUpService } from "./services/auth.service.js";

const authController = Router();

/* == signUpController == */
authController.post("/sign-up", signUpService);

export { authController };

