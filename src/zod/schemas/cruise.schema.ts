import { z } from "zod";

export const shipSchema = z.object({
  ship_id: z.string().optional(),
  ship_name: z
    .string()
    .min(3, {
      message: "Ship name must be at least 3 characters long",
    })
    .max(32, {
      message: "Ship name must be at most 32 characters long",
    })
    .trim(),
  ship_image: z.any(),

  ship_class: z
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
  cabin_id: z.string().optional(),
  ship_id: z.string(),
  cabin_name: z
    .string()
    .min(3, {
      message: "Ship name must be at least 3 characters long",
    })
    .max(32, {
      message: "Ship name must be at most 32 characters long",
    })
    .trim(),
  cabin_image: z.any(),
});

export const cruiseItinerarySchema = z.object({
  cruise_itinerary_id: z.string().optional(),
  cruise_id: z.string(),
  map: z.string(),
  day: z.date(),
  arrive: z.string(),
  depart: z.string(),
  location: z.string(),
});
