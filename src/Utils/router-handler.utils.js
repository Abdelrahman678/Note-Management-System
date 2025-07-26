import { authController } from "../Modules/index.modules.controller.js";

const routerHandler = (app) => {
  app.use("/auth", authController);
};

export default routerHandler;
