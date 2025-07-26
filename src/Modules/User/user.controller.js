import { Router } from "express";
import {
  errorHandlerMiddleware,
  authenticationMiddleware,
  Multer,
} from "../../Middleware/index.middleware.js";
import { updateProfilePictureService } from "./services/user.service.js";

const userController = Router();

/* == authenticationMiddleware == */
userController.use(authenticationMiddleware());

/* == updateProfilePictureController == */
userController.patch(
  "/upload-profile-pic",
  Multer("user/profile-pic").single("image"),
  errorHandlerMiddleware(updateProfilePictureService)
);

export { userController };
