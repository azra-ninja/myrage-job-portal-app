import expressAsyncHandler from "express-async-handler";
import Application from "../models/Application.js";

export const applyToJob = expressAsyncHandler(async (req, res) => {
    const user = req.user;
    const {jobId} = req.params;

    // checks for authorized applicant to be able to apply(not admin)
    if (user.role !== "applicant") {
        res.status(403);
        throw new Error("Only applicant can apply");
    }

    const existingApplication = await Application.findOne({
        userId: user._id,
        jobId
    });

    // checks for existing application
    if (existingApplication) {
        res.status(400);
        throw new Error("Application already exists")
    }

    // checks for authorized applicant resume
    if (!user.resume) {
        res.status(400);
        throw new Error("Upload resume first");
    }

    // creates the application
    const application = await Application.create({
        userId: user._id,
        jobId,
        resume: user.resume
    });

    res.status(201).json({
        success: true,
        data: {
            application
        }
    });
});

export const getApplications = expressAsyncHandler(async (req, res) => {
    let applications;

    // checks for both authorized admin and applicant
    if (req.user.role === "admin") {
        // display the entire application for only admin
        applications = await Application.find()
            .populate("userId", "name email")
            .populate("jobId", "title company");
    } else {
        // display only the applications the applicants applied for
        applications = await Application.find({ userId: req.user._id})
            .populate("jobId", "title company")
    }

    res.status(200).json({
        success: true,
        count: applications.length,
        data: {
            applications
        }
    });
});

export const updateApplication = expressAsyncHandler(async (req, res) => {
    const {status} = req.body;

    const application = await Application.findById(req.params.id);

    // checks for whether that specific application exists
    if (!application) {
        res.status(404);
        throw new Error("Application not found");
    }

    // checks for the authorized admin(no applicant is able to use this route)
    if (req.user.role !== "admin") {
        res.status(403);
        throw new Error("Not authorized");
    }

    // updates the applications status
    application.status = status || application.status;

    await application.save();

    res.status(200).json({
        success: true,
        message: "Application updated successfully",
        data: {
            application
        }
    });
});

export const deleteApplication = expressAsyncHandler(async (req, res) => {
    const application = await Application.findById(req.params.id);

    // checks for whether that specific application exists
    if (!application) {
        res.status(404);
        throw new Error("Application not found");
    }

    // checks whether the userId corresponds with id of the authorized user
    if (application.userId.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error("Not authorized to delete");
    }

    await application.deleteOne();

    res.status(200).json({
        success: true,
        message: "Application withdrawn successfully"
    });
});