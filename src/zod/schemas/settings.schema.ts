import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const passwordSchema = z
  .object({
    old_password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    new_password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirm_password: z.string(),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export const emailSchema = z.object({
  email: z.string().email().toLowerCase(),
});

export const fullNameSchema = z.object({
  first_name: z.string().toLowerCase().optional(),
  last_name: z.string().toLowerCase().optional(),
});

export const phoneSchema = z.object({
  phone: z
    .string()
    .min(10, {
      message: "Cellphone number must be at least 10 numbers",
    })
    .max(10, {
      message: "Cellphone number must be at most 10 numbers",
    }),
});

export const imageSchema = z.object({
  image: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});
