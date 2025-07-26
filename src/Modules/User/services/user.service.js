import { User } from "../../../DB/models/index.model.js";

/* == Update Profile Picture Service == */
export const updateProfilePictureService = async (req, res) => {
  const { _id } = req.loggedInUser;
  const { file } = req;
  /* return error if no file uploaded */
  if (!file) {
    return res.status(400).json({
      message: "No file uploaded",
    });
  }
  const url = `${req.protocol}://${req.headers.host}/${file.path}`;
  const user = await User.findByIdAndUpdate(
    _id,
    { profilePicture: url },
    { new: true, select: "-password -__v" }
  );
  res.status(200).json({
    message: "Profile picture uploaded successfully",
    user,
  });
};
