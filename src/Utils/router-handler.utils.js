import { authController } from "../Modules/index.modules.controller.js";
import { globalErrorHandlerMiddleware } from "../Middleware/index.middleware.js";

const routerHandler = (app) => {
  /* == Auth Router == */
  app.use("/auth", authController);
  /* == Home Router == */
  app.get("/", (req, res) => {
    res.status(200).json({
      message: "Welcome to Note Management System",
    });
  });
  /* Global error handler */
  app.use(globalErrorHandlerMiddleware);
};

export default routerHandler;
