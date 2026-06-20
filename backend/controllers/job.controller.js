import expressAsyncHandler from "express-async-handler";
import Job from "../models/Job.js";
import Application from "../models/Application.js";

// Create Job Controller
export const createJob = expressAsyncHandler(async (req, res) => {
  const { title, company, description, location, salary } = req.body;

  const job = await Job.create({
    title,
    company,
    description,
    location,
    salary: {
      min: salary.min,
      max: salary.max,
      currency: salary.currency,
    },
    createdBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Job created successfully",
    data: {
      job,
    },
  });
});

// Get All Job Controller
export const getJobs = expressAsyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 6;

  const skip = (page - 1) * limit;

  const jobs = await Job.find().sort({ createdAt: -1 }).skip(skip).limit(limit);

  const totalJobs = await Job.countDocuments();

  res.status(200).json({
    jobs,
    currentPage: page,
    totalPages: Math.ceil(totalJobs / limit),
    totalJobs,
  });
});

export const searchJobs = expressAsyncHandler(async (req, res) => {
  const search = req.query.q || "";

  const jobs = await Job.find({
    title: {
      $regex: search,
      $options: "i",
    },
  }).sort({ createdAt: -1 });

  res.status(200).json(jobs);
});

// Get a Specific Job Controller
export const getJobById = expressAsyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }
  res.status(200).json(job);
});

export const getTrendingJobs = expressAsyncHandler(async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 }).limit(4);
  res.status(200).json(jobs);
});

// Update Job Controller
export const updateJob = expressAsyncHandler(async (req, res) => {
  const { title, company, description, location, salary } = req.body;

  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  job.title = title || job.title;
  job.company = company || job.company;
  job.description = description || job.description;
  job.location = location || job.location;

  if (salary) {
    job.salary.min = salary.min ?? job.salary.min;
    job.salary.max = salary.max ?? job.salary.max;
    job.salary.currency = salary.currency ?? job.salary.currency;
  }

  const updatedJob = await job.save();

  res.status(200).json({
    success: true,
    message: "Job updated successfully",
    data: {
      updatedJob,
    },
  });
});

// Delete Job Controller
export const deleteJob = expressAsyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  // Remove applications connected to this job
  await Application.deleteMany({
    jobId: job._id,
  });

  await job.deleteOne();

  res.status(200).json({
    success: true,
    message: "Job deleted successfully",
  });
});
