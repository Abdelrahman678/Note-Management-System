import { Note } from "../../../DB/models/index.model.js";
import { CohereClient } from "cohere-ai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Function to get Cohere client
const getCohereClient = () => {
  const apiKey = process.env.COHERE_API_KEY;
  if (!apiKey) {
    console.error("COHERE_API_KEY is not set in environment variables");
    throw new Error("API key not configured");
  }
  return new CohereClient({ token: apiKey });
};

export const aiService = async (req, res) => {
  try {
    const { id: noteId } = req.params;
    const { _id: ownerId } = req.loggedInUser;

    // Check if the note exists
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    // Verify note ownership
    if (note.ownerId.toString() !== ownerId.toString()) {
      return res.status(403).json({
        message: "You don't have permission to access this note",
      });
    }

    // Initialize Cohere client and generate summary
    const cohere = getCohereClient();
    const response = await cohere.generate({
      model: "command",
      prompt: `Please provide a clear and concise summary of the following note in one line:\n\n${note.content}`,
      max_tokens: 150,
      temperature: 0.3,
      k: 0,
      stop_sequences: [],
      return_likelihoods: "NONE",
    });

    const summary = response.generations[0]?.text.trim();

    if (!summary) {
      throw new Error("No summary was generated");
    }

    return res.status(200).json({
      status: "success",
      data: { summary },
    });
  } catch (error) {
    console.error("Error in aiService:", error);
    return res.status(500).json({
      message: "Failed to generate summary",
      error: error.message || "Unknown error occurred",
    });
  }
};

//* OpenAI *//
/*
import OpenAI from "openai";
import { Note } from "../../../DB/models/index.model.js";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const aiService = async (req, res) => {
  try {
    const { id: noteId } = req.params;
    const { _id: ownerId } = req.loggedInUser;

    // check if the note exists only
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    // check if the note belongs to the user
    if (note.ownerId.toString() !== ownerId.toString()) {
      return res.status(403).json({
        message: "You don't have permission to access this note",
      });
    }

    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that summarizes notes concisely.",
        },
        {
          role: "user",
          content: `Please provide a clear and concise summary of the following note in one paragraph:\n\n${note.content}`,
        },
      ],
      temperature: 0.3,
      max_tokens: 150,
    });

    const summary = response.choices[0]?.message?.content?.trim();

    if (!summary) {
      return res.status(500).json({
        message: "Failed to generate summary",
        error: error,
      });
    }

    return res.status(200).json({
      status: "success",
      data: {
        summary,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to generate summary",
      error: error,
    });
  }
};

 */
