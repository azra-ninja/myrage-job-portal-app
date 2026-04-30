import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

export const register = expressAsyncHandler(async (req, res) => {
    const {name, email, password, role} = req.body;

    const existingUser = await User.findOne({email});

    if (existingUser) {
        res.status(400);
        throw new Error("User already exists.");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const image = req.files?.image?.[0]?.path || "";
    const resume = req.files?.resume?.[0]?.path || "";

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: "applicant",
        image,
        resume,
    });

    const token = generateToken(user._id);

    res.status(201).json({
        success: true,
        message: "User created successfully",
        data: {
            user,
            token,
        },
    });
});

export const login = expressAsyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email}).select("+password");

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(401);
        throw new Error("Invalid Password");
    }

    const token = generateToken(user._id);

    res.status(200).json({
        success: true,
        message: "Logged in successfully",
        data: {
            name: user.name,
            email: user.email,
            role: user.role,
            token,
        },
    });
});
