import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import applicationRouter from "./routes/application.route.js";
import errorHandler from "./middleware/error.middleware.js";
import jobRouter from "./routes/job.route.js";

const app = express();

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  }),
);

app.use(express.json());
// Static files (uploaded images/resumes)
app.use("/uploads", express.static("./uploads"));

// Route
app.use("/api/v1/aut", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/jobs", jobRouter);
app.use("/api/v1/applications", applicationRouter);

// 404 Route not found
app.use((req, res, next) => {
  res.status(404);
  next(new Error("Route not found"));
});

// Error middleware
app.use(errorHandler);

export default app;
