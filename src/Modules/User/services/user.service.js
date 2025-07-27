import { User } from "../../../DB/models/index.model.js";

/**
 * Updates the profile picture of the authenticated user
 * @async
 * @function updateProfilePictureService
 * @param {Object} req - Express request object
 * @param {Object} req.file - Uploaded file object from multer
 * @param {Object} req.loggedInUser - Authenticated user object from JWT
 * @param {string} req.loggedInUser._id - User ID
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Response with success message and user data
 * @throws {Object} Error response if file upload fails or user not found
 */
export const updateProfilePictureService = async (req, res) => {
  const { _id } = req.loggedInUser;
  const { file } = req;

  // Return error if no file was uploaded
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

  // Return success response with updated user data
  return res.status(200).json({
    message: "Profile picture uploaded successfully",
    data: {
      profilePicture: user.profilePicture,
    },
  });
};
