import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

// Create User Controller
export const createUser = expressAsyncHandler(async (req, res) => {
    const {name, email, password, role} = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please enter all fields");
    }

    const existingUser = await User.findOne({email});

    if (existingUser) {
        res.status(400);
        throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const image = req.files?.image?.[0]?.path || "";

    const user = await User.create({
        name, email, password: hashedPassword, role: role || "applicant", image, resume: ""
    });

    const token = generateToken(user._id);

    res.status(201).json({
        success: true, message: "User created successfully", data: {
            user, token
        }
    });
});

// Get All Users Controller
export const getUsers = expressAsyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users)
});

// Get a Specific User Controller
export const getUserById = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    res.status(200).json(user);
});

// Update User Controller
export const updateUser = expressAsyncHandler(async (req, res) => {
    const {name, email, password, role} = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = (await bcrypt.hash(password, salt)) || user.password;
    }

    user.role = role || user.role;

    const imagePath = req.files?.image?.[0] ? `uploads/images/${req.files?.image?.[0].filename}` : user.image;
    user.image = imagePath;

    const resumePath = req.files?.resume?.[0] ? `uploads/resumes/${req.files?.resume?.[0].filename}` : user.resume;
    user.resume = resumePath;

    const updatedUser = await user.save();

    res.status(200).json({
        success: true, message: "User updated successfully", data: {
            updatedUser,
        }
    });
});

// Delete User Controller
export const deleteUser = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    await user.deleteOne();

    res.status(200).json({
        success: true, message: "User deleted successfully"
    });
});