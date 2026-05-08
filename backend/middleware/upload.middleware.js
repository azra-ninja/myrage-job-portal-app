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
        const allowedTypes = [
            "application/pdf",
            "application/msword", // .doc
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" // .docx
        ];
            
;        // allow PDF's files
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only PDF and Word files are allowed"), false);
        }
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024 // 2MB
    }
});

export default upload;
