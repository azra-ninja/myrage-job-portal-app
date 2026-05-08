import express from "express";
import {authorize} from "../middleware/auth.middleware.js";
import {
    applyToJob,
    deleteApplication,
    getApplications,
    updateApplication
} from "../controllers/application.controller.js";

const applicationRouter = express.Router();

applicationRouter.post("/:jobId/apply", authorize, applyToJob);
applicationRouter.get("/", authorize, getApplications);
applicationRouter.put("/:id", authorize, updateApplication);
applicationRouter.delete("/:id", authorize, deleteApplication);

//69f47c50fc3bb12bc2614b4e
//69f47cc7fc3bb12bc2614b50
//localhost:5000/api/v1/applications/69fddecf5122a12bc169ef03


export default applicationRouter;