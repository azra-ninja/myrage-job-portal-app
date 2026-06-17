import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";

export const dashboardStats = expressAsyncHandler(async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  const applications = await Application.countDocuments();

  res.status(200).json({
    users,
    jobs,
    applications,
  });
});
