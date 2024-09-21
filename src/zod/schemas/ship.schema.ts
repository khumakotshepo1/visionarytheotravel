import { z } from "zod";

export const shipSchema = z.object({
  ship_id: z.string(),
  name: z
    .string()
    .min(3, {
      message: "Ship name must be at least 3 characters long",
    })
    .max(32, {
      message: "Ship name must be at most 32 characters long",
    })
    .trim(),
  image: z.any(),

  type: z
    .string()
    .min(3, {
      message: "Ship type must be at least 3 characters long",
    })
    .max(32, {
      message: "Ship type must be at most 32 characters long",
    })
    .trim(),
});

export const cabinSchema = z.object({
  cabin_id: z.string(),
  ship_id: z.string(),
  name: z
    .string()
    .min(3, {
      message: "Ship name must be at least 3 characters long",
    })
    .max(32, {
      message: "Ship name must be at most 32 characters long",
    })
    .trim(),
  image: z.any(),
});
