import mongoose from "mongoose";

export const db_connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected");
  } catch (error) {
    console.log("Database connection error", error);
  }
};
