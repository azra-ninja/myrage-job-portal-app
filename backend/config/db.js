import mongoose from "mongoose";
import { env } from "./env.js";

const connectDB = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log("SUCCESSFULLY CONNECTED TO MONGODB");
  } catch (err) {
    console.error(err.message);
  }
};

export default connectDB;
