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

  day: z.string(),
  arrive: z.string(),
  depart: z.string(),
  location: z.string(),
});

export const cruiseSchema = z.object({
  cruise_id: z.string().optional(),
  ship_id: z.string(),
  cruise_name: z
    .string()
    .min(3, {
      message: "Cruise name must be at least 3 characters long",
    })
    .max(32, {
      message: "Cruise name must be at most 32 characters long",
    }),
  description: z
    .string()
    .min(3, {
      message: "Cruise description must be at least 3 characters long",
    })
    .max(32, {
      message: "Cruise description must be at most 32 characters long",
    }),
  duration: z
    .string()
    .min(3, {
      message: "Cruise duration must be at least 3 characters long",
    })
    .max(32, {
      message: "Cruise duration must be at most 32 characters long",
    })
    .trim(),
  embarkation_date: z.date(),
  disembarkation_date: z.date(),
  departure_port: z
    .string()
    .min(3, {
      message: "Departure port must be at least 3 characters long",
    })
    .max(32, {
      message: "Departure port must be at most 32 characters long",
    }),
  cruise_price: z.number(),
  map: z.string(),
});
