import { Note } from "../../DB/models/index.model.js";

export const listAllNotesResolver = async () => {
  const notes = await Note.find()
    .populate("ownerId")
    .sort({ createdAt: -1 })
    .limit(3);
  return notes;
};
