import {
  authController,
  userController,
  noteController,
} from "../Modules/index.modules.controller.js";
import { globalErrorHandlerMiddleware } from "../Middleware/index.middleware.js";
import { rateLimit } from "express-rate-limit";
import express from "express";
import { mainSchema } from "../GraphQl/main.schema.js";
import { createHandler } from "graphql-http/lib/use/express";

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

  /* == GraphQL Router == */
  app.use("/graphql", createHandler({ schema: mainSchema }));
  /* == Auth Router == */
  app.use("/auth", authController);
  /* == User Router == */
  app.use("/user", userController);
  /* == Note Router == */
  app.use("/note", noteController);
  /* == Home Router == */
  app.get("/", (req, res) => {
    res.status(200).json({
      message: "Welcome to Note Management System",
    });
  });
  /* == Assets Router == */
  app.use("/assets", express.static("assets"));
  app.use((req, res) => {
    res.status(404).json({
      message: "Route not found",
    });
  });
  /* Global error handler */
  app.use(globalErrorHandlerMiddleware);
};

export default routerHandler;
