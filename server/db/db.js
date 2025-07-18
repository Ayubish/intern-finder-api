import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log("Already connected to MongoDB.");
    return mongoose.connection.getClient();
  }

  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  return mongoose.connection.getClient().db();
};

export const client = await connectDB(); // Ensure client is ready before exporting
export default connectDB;
