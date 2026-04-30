import multer from "multer";
import path from "path";

// Storage config
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        if (file.fieldname === "image") {
            cb(null, path.resolve("uploads/images"));
        } else if (file.fieldname === "resume") {
            cb(null, path.resolve("uploads/resumes"));
        }
    },

    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    },
});

// Filter file
const fileFilter = (req, file, cb) => {
    if (file.fieldname === "image") {
        // allow images only
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image file are allowed"), false);
        }
    }

    if (file.fieldname === "resume") {
        // allow PDF's files
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(new Error("Only PDF files are allowed"), false);
        }
    }
};

const upload = multer({
    storage,
    fileFilter,
});

export default upload;
