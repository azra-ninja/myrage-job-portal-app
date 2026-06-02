import express from "express";
import { authorize } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import {
  createJobSchema,
  updateJobSchema,
} from "../validations/job.validation.js";
import { authorizeRole } from "../middleware/role.middleware.js";
import {
  createJob,
  getJobs,
  getJobById,
  getTrendingJobs,
  updateJob,
  deleteJob,
  searchJobs,
} from "../controllers/job.controller.js";

const jobRouter = express.Router();

jobRouter.post(
  "/",
  authorize,
  validate(createJobSchema),
  authorizeRole("admin"),
  createJob,
);
jobRouter.get("/", getJobs);
jobRouter.get("/trending-jobs", getTrendingJobs);
jobRouter.get("/search", searchJobs);
jobRouter.get("/:id", getJobById);
jobRouter.put(
  "/:id",
  authorize,
  validate(updateJobSchema),
  authorizeRole("admin"),
  updateJob,
);
jobRouter.delete("/:id", authorize, authorizeRole("admin"), deleteJob);

export default jobRouter;
