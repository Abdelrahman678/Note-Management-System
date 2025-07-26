import { User, BlackListTokens } from "../../../DB/models/index.model.js";
import { compareSync, hashSync } from "bcrypt";
import { generateToken, verifyToken } from "../../../Utils/token.utils.js";
import { v4 as uuidv4 } from "uuid";
import { emailEventEmitter } from "../../../Services/send-email.service.js";

/* == signUpService == */
export const signUpService = async (req, res) => {
  /* Destructure req.body */
  const { username, email, password, age, gender } = req.body;
  /* Check if user already exists */
  const isEmailExist = await User.findOne({ email: email });
  if (isEmailExist) {
    return res
      .status(409)
      .json({ message: "Email already exist. Please try another email." });
  }

  /**  Already Hashed Password using pre save hook  **/

  /* Create User */
  const user = new User({
    username,
    email,
    password,
    age,
    gender,
  });
  /* Save User */
  await user.save();
  /* Return success response */
  if (!user) {
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
  return res.status(201).json({
    message: "User created successfully",
    data: user,
  });
};

/* == signInService == */
export const signInService = async (req, res) => {
  /* destructure request body */
  const { email, password } = req.body;
  /* find user by email */
  const user = await User.findOne({ email: email });
  /* return error if user not found */
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  /* compare password */
  const isPasswordMatch = compareSync(password, user.password);
  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  /* generate tokens */
  const accessToken = generateToken({
    publicClaims: { _id: user._id },
    registeredClaims: {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
      jwtid: uuidv4(),
    },
    secretKey: process.env.JWT_SECRET_LOGIN,
  });
  /* generate refresh token */
  const refreshToken = generateToken({
    publicClaims: { _id: user._id },
    registeredClaims: {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
      jwtid: uuidv4(),
    },
    secretKey: process.env.JWT_SECRET_REFRESH,
  });
  /* return success response */
  return res.status(200).json({
    message: "User logged in successfully",
    tokens: {
      accessToken,
      refreshToken,
    },
  });
};

/* == signOutService == */
export const signOutService = async (req, res) => {
  /* destructure request headers */
  const { accesstoken, refreshtoken } = req.headers;
  /* verify access token */
  const decoded = verifyToken({
    token: accesstoken,
    secretKey: process.env.JWT_SECRET_LOGIN,
  });
  /* verify refresh token */
  const decodedRefresh = verifyToken({
    token: refreshtoken,
    secretKey: process.env.JWT_SECRET_REFRESH,
  });
  /* insert tokens in black list */
  await BlackListTokens.insertMany([
    { tokenId: decoded.jti, expiryDate: decoded.exp },
    { tokenId: decodedRefresh.jti, expiryDate: decodedRefresh.exp },
  ]);
  /* return success response */
  return res.status(200).json({
    message: "User logged out successfully",
  });
};

/* === forgetPassword === */
export const forgotPasswordService = async (req, res) => {
  /* destructure request body */
  const { email } = req.body;
  /* check if user exists */
  const user = await User.findOne({ email: email });
  /* return not found if user not found */
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  /* generate otp */
  const otp = Math.floor(Math.random() * 10000);
  /* send otp to user email */
  emailEventEmitter.emit("SendEmail", {
    subject: "Reset your password",
    html: `
      <div style=" height: 100vh; background-color: #f2f2f2; font-family: Arial, sans-serif; line-height: 1.5; text-align: center;>
          <h1 style="color: #4CAF50;">Reset Your Password</h1>
          <p>Hello,</p>
          <p>We received a request to reset your password. Your OTP is:</p>
          <p style="font-size: 24px; color: #FF5722;"><strong>${otp}</strong></p>
          <p>Please enter this OTP on the reset page to proceed.</p>
          <p>If you did not request this, please ignore this email.</p>
          <p>Thank you!</p>
          <p>Best regards,<br>The Job Search App Team</p>
      </div>
      `,
    to: user.email,
  });
  /* hash otp and save in db */
  const hashedOtp = hashSync(otp.toString(), parseInt(process.env.SALT_ROUNDS));
  /* save hashed otp in db */
  user.forgotPasswordOtp = {
    code: hashedOtp,
    expiry: new Date(Date.now() + 10 * 60 * 1000),
  };
  /* save user */
  await user.save();
  /* return success response */
  return res.status(200).json({
    message: "forgot password otp sent successfully",
  });
};

/* === resetPassword === */
export const resetPasswordService = async (req, res) => {
  /* destructure request body */
  const { email, newPassword, otp } = req.body;

  /* find user by email */
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  /* Check if user has OTP */
  if (!user.forgotPasswordOtp) {
    return res.status(400).json({
      message: "Generate OTP first",
    });
  }

  /* Check if OTP is valid */
  const isOtpMatch = compareSync(otp.toString(), user.forgotPasswordOtp.code);
  if (!isOtpMatch) {
    return res.status(400).json({
      message: "OTP does not match",
    });
  }

  /* Check OTP expiry */
  const isOtpExpired = user.forgotPasswordOtp.expiry < new Date();
  if (isOtpExpired) {
    return res.status(400).json({
      message: "OTP has expired",
    });
  }

  /* Update user with new password and unset OTP */
  user.password = newPassword;
  user.forgotPasswordOtp = {
    code: null,
    expiry: null,
  };

  /* Save the updated user */
  await user.save();

  /* Return success response */
  return res.status(200).json({
    message: "Password reset successfully",
  });
};

/* === refresh token === */
export const refreshTokenService = async (req, res) => {
  /* get refresh token from headers */
  const { refreshtoken } = req.headers;
  /* verify refresh token */
  const decoded = verifyToken({
    token: refreshtoken,
    secretKey: process.env.JWT_SECRET_REFRESH,
  });
  /* generate new access token */
  const accessToken = generateToken({
    publicClaims: { _id: decoded._id },
    registeredClaims: {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
      jwtid: uuidv4(),
    },
    secretKey: process.env.JWT_SECRET_LOGIN,
  });
  /* return success response */
  return res.status(200).json({
    message: "Token refreshed successfully",
    accessToken,
  });
};
