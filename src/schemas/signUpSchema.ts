import { z } from "zod";

export const UsernameValidation = z
  .string()
  .min(2, "Username must be atleast 2 characters")
  .max(20, "Username must be no  morer than 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must no contain special characters");

export const signUpSchema = z.object({
  username: UsernameValidation,
  email: z
    .string()
    .email({ message: "Invalid email Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast of 6 characters" }),
});
