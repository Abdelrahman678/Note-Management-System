import { User } from "../../../DB/models/index.model.js";
import { compareSync } from "bcrypt";
import { generateToken } from "../../../Utils/token.utils.js";
import { v4 as uuidv4 } from "uuid";

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
