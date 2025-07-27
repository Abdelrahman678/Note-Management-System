import { Router } from "express";
import {
  errorHandlerMiddleware,
  authenticationMiddleware,
} from "../../Middleware/index.middleware.js";
import {
  createNoteService,
  deleteNoteService,
} from "./services/note.service.js";

const noteController = Router();

// Apply authentication to all note routes
noteController.use(authenticationMiddleware());

// Create a new note
noteController.post("/create-note", errorHandlerMiddleware(createNoteService));

// Delete a note by ID
noteController.delete(
  "/delete-note/:id",
  errorHandlerMiddleware(deleteNoteService)
);

export { noteController };
