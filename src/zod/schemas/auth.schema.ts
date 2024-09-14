import { z } from "zod";

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const userRegisterSchema = z
  .object({
    first_name: z
      .string()
      .min(3, {
        message: "First name must be at least 3 characters long",
      })
      .toLowerCase()
      .trim(),
    last_name: z
      .string()
      .min(3, {
        message: "Last name must be at least 3 characters long",
      })
      .toLowerCase()
      .trim(),
    email: z
      .string()
      .email({
        message: "Email is invalid",
      })
      .trim(),
    phone: z
      .string()
      .min(10, {
        message: "Phone number must be at least 10 characters long",
      })
      .max(10, {
        message: "Phone number must be at most 10 characters long",
      })
      .trim(),
    password: z
      .string()
      .min(6, {
        message: "Password must be at least 6 characters long",
      })
      .max(32, {
        message: "Password must be at most 32 characters long",
      })
      .trim(),
    confirm_password: z.string().trim(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export const resetPasswordSchema = z.object({
  email: z.string().trim(),
});

export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters long",
      })
      .max(32, {
        message: "Password must be at most 32 characters long",
      })
      .trim(),
    confirm_password: z.string().trim(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });
