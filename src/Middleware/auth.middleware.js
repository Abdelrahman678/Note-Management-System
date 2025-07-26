import jwt from "jsonwebtoken";
import { User, BlackListTokens } from "../DB/models/index.model.js";

/* == authenticationMiddleware == */
export const authenticationMiddleware = () => {
  return async (req, res, next) => {
    try {
      /* Destructure accesstoken from request headers */
      const { accesstoken } = req.headers;
      /* Check if accesstoken exists */
      if (!accesstoken) {
        return res.status(401).json({
          message: "please log in first",
        });
      }
      /* Verify accesstoken */
      const decoded = jwt.verify(accesstoken, process.env.JWT_SECRET_LOGIN);
      const isTokenBlacklisted = await BlackListTokens.findOne({
        tokenId: decoded.jti,
      });
      /* Check if token is blacklisted */
      if (isTokenBlacklisted) {
        /* Token is blacklisted */
        return res.status(401).json({
          message: "Token expired, please log in again",
        });
      }
      /* Get user data */
      const user = await User.findById(decoded._id, "-password -__v");
      /* Check if user exists */
      if (!user) {
        return res.status(404).json({
          message: "please sign up first",
        });
      }
      /* Add user to request */
      req.loggedInUser = {
        ...user._doc,
        token: { tokenId: decoded.jti, expiryDate: decoded.exp },
      };
      next();
    } catch (error) {
      /* Check if token is expired */
      if (error.name === "jwt expired") {
        return res.status(401).json({
          message: "Token expired, please log in again",
        });
      }
      return res.status(500).json({
        message: error,
      });
    }
  };
};
