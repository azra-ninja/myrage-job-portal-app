import z, { email } from "zod";

export const registerUserSchema = z.object({
  name: z.string().min(3, "Name must be atleast 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["admin", "applicant"]).default("applicant"),
});
