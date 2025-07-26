import { authController, userController } from "../Modules/index.modules.controller.js";
import { globalErrorHandlerMiddleware } from "../Middleware/index.middleware.js";
import { rateLimit } from "express-rate-limit";
import express from "express";

/* rate Limiter */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 15,
  message: {
    message: "Too many requests, please try again later",
  },
  legacyHeaders: false,
});
const routerHandler = (app) => {
  /* apply limiter to all routes */
  //   app.use(limiter);

  /* == Auth Router == */
  app.use("/auth", authController);
  /* == User Router == */
  app.use("/user", userController);
  /* == Home Router == */
  app.get("/", (req, res) => {
    res.status(200).json({
      message: "Welcome to Note Management System",
    });
  });
  /* == Assets Router == */
  app.use('/assets', express.static('assets'));
  /* Global error handler */
  app.use(globalErrorHandlerMiddleware);
};

export default routerHandler;
