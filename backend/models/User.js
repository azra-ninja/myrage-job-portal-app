import mongoose from "mongoose";
import { lowercase, minLength, required } from "zod/mini";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      select: false
    },
    role: {
      type: String,
      enum: ["applicant", "admin"],
      default: "applicant",
    },
    image: {
      type: String,
      default: "",
    },
    resume: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
