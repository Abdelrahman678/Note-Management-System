import { Note } from "../../../DB/models/index.model.js";

/**
 * Creates a new note for the authenticated user
 * @async
 * @function createNoteService
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body containing note data
 * @param {string} req.body.title - Title of the note (required)
 * @param {string} req.body.content - Content of the note (required)
 * @param {Object} req.loggedInUser - Authenticated user object from middleware
 * @param {string} req.loggedInUser._id - ID of the note owner
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Response with created note data or error message
 * @throws {Object} 400 - If title or content is missing
 */
export const createNoteService = async (req, res) => {
  const { title, content } = req.body;
  const { _id: ownerId } = req.loggedInUser;
  if (!title || !content) {
    return res.status(400).json({
      message: "Title and content are required",
    });
  }
  // Create new note
  const note = await Note.create({
    title,
    content,
    ownerId,
  });

  // Return success response with created note
  return res.status(201).json({
    message: "Note created successfully",
    data: note,
  });
};

/**
 * Deletes a note if it belongs to the authenticated user
 * @param {Object} req - Express request object
 * @param {Object} req.params - Request parameters
 * @param {string} req.params.id - Note ID to delete
 * @param {Object} req.loggedInUser - Authenticated user object
 * @param {string} req.loggedInUser._id - User ID
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Response with success or error message
 */
export const deleteNoteService = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.loggedInUser;

  // check if the note exists
  const note = await Note.findById(id);
  if (!note) {
    return res.status(404).json({
      message: "Note not found",
    });
  }

  // check if the note belongs to the user
  if (note.ownerId.toString() !== userId.toString()) {
    return res.status(403).json({
      message: "You don't have permission to delete this note",
    });
  }

  // delete the note
  await Note.findByIdAndDelete(id);

  return res.status(200).json({
    message: "Note deleted successfully",
  });
};
