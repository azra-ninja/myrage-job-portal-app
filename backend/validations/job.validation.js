import { z } from "zod";

// Create job validator
export const createJobSchema = z.object({
    "title": z.string().min(3, "Title must be at least 3 characters"),
    "company": z.string().min(1, "Company must be at least a single character"),
    "description": z.string().min(10),
    "location": z.string(),
    salary: z.object({
        min: z.coerce.number().min(0, "Min salary must be positive"),
        max: z.coerce.number().min(0).max(1000000000),
        currency: z.string().length(3, "Currency must be a 3-letter code")
    }).refine(data => data.max >= data.min, {
        message: "Max salary must be greater than or equal to min salary",
        path: ["max"]
    }),
});

// Update job validator
export const updateJobSchema = z.object({
    "title": z.string().min(3, "Title must be at least 3 characters"),
    "company": z.string().min(1, "Company must be at least a single character"),
    "description": z.string().min(10),
    "location": z.string(),
    salary: z.object({
        min: z.coerce.number().min(0, "Min salary must be positive"),
        max: z.coerce.number().min(0).max(1000000000),
        currency: z.string().length(3, "Currency must be a 3-letter code")
    }).refine(data => data.max >= data.min, {
        message: "Max salary must be greater than or equal to min salary",
        path: ["max"]
    }),
});