import mongoose from "mongoose";
const { Schema } = mongoose;

/* Black List Tokens Schema */
const blackListTokensSchema = new Schema(
  {
    tokenId: { type: String, required: true, unique: true },
    expiryDate: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const BlackListTokens =
  mongoose.models.BlackListTokens ||
  mongoose.model("BlackListTokens", blackListTokensSchema);
