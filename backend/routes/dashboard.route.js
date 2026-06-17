import express from "express";
import { authorize } from "../middleware/auth.middleware.js";
import { dashboardStats } from "../controllers/dashboard.controller.js";

const dashboardRouter = express.Router()

dashboardRouter.get("/stats", authorize, dashboardStats)

export default dashboardRouter;