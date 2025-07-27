import { Router } from "express";
import {
  errorHandlerMiddleware,
  authenticationMiddleware,
} from "../../Middleware/index.middleware.js";
import { aiService } from "./services/ai.service.js";

const aiController = Router();

// Apply authentication to all note routes
aiController.use(authenticationMiddleware());

// Create a new note
aiController.post("/summary/:id", errorHandlerMiddleware(aiService));

// Export the router as default
export default aiController;
