import { User } from "../../../DB/models/index.model.js";

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
