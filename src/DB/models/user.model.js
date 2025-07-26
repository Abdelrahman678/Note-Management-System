import mongoose from "mongoose";
import { genderEnum } from "../../Constants/constants.js";
const { Schema } = mongoose;

/* User Schema */
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: Object.values(genderEnum),
      default: genderEnum.MALE,
    },
    phone: {
      type: String,
    },
    profilePic: {
      secure_url: String,
      public_id: String,
      folderId: String,
    },
    forgotPasswordOtp: {
      code: String,
      expiry: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
