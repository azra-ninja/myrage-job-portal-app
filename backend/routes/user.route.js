import express from "express";
import { authorize } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";
import { authorizeRole } from "../middleware/role.middleware.js";
import {createUser, deleteUser, getUserById, getUsers, updateUser} from "../controllers/user.controller.js";
import validate from "../middleware/validate.middleware.js";
import {createUserSchema, updateUserSchema} from "../validations/user.validation.js";

const userRouter = express.Router();

userRouter.post(
  "/",
  authorize,
  upload.fields([{ name: "image", maxCount: 1 }]),
  authorizeRole("admin"),
  validate(createUserSchema),
  createUser,
);

userRouter.get("/", authorize, authorizeRole("admin"), getUsers);

userRouter.get("/:id", authorize, authorizeRole("admin"), getUserById);

userRouter.put(
    "/:id",
    authorize,
    upload.fields([{ name: "image", maxCount: 1 }, { name: "resume", maxCount: 1 }]),
    authorizeRole("admin"),
    validate(updateUserSchema),
    updateUser
);

userRouter.delete("/:id", authorize, authorizeRole("admin"), deleteUser)

export default userRouter;
