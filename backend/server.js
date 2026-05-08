import app from "./app.js";
import connectDB from "./config/db.js";
import { env } from "./config/env.js";

// Database connection
connectDB();

// Server
app.listen(env.port, () => {
  console.log("Server is running on port: 5000");
});
