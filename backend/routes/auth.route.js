import express from "express";
import upload from "../middleware/upload.middleware.js";
import {login, register} from "../controllers/auth.controller.js";
import validate from "../middleware/validate.middleware.js";
import {
    loginUserSchema,
    registerUserSchema,
} from "../validations/user.validation.js";

const authRouter = express.Router();

authRouter.post(
    "/register",
    upload.fields([
        {name: "image", maxCount: 1},
        {name: "resume", maxCount: 1},
    ]),
    validate(registerUserSchema),
    register,
);

authRouter.post("/login", validate(loginUserSchema), login);

export default authRouter;
