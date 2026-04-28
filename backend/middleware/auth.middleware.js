import { env } from "../config/env.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const authorize = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    const decoded = jwt.verify(token, env.jwtSecret);

    const user = await User.findById(decoded.userId);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    req.user = user;

    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ message: "Unauthorized" });
  }
};
