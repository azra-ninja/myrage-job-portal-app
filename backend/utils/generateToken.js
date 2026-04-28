import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

const generateToken = (id) => {
  jwt.sign({ userId: id }, env.jwtSecret, { expiresIn: "1d" });
};

export default generateToken;
