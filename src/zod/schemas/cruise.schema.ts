import { z } from "zod";

export const shipSchema = z.object({
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
  cruise_id: z.string(),
  day: z.string(),
  arrive: z.string().optional(),
  depart: z.string().optional(),
  location: z.string(),
});

export const cruiseSchema = z.object({
  ship_id: z.string(),
  cruise_destination: z.string(),
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
    .max(255, {
      message: "Cruise description must be at most 255 characters long",
    }),
  duration: z.string().trim(),
  embarkation_date: z.coerce.date(),
  disembarkation_date: z.coerce.date(),
  departure_port: z
    .string()
    .min(3, {
      message: "Departure port must be at least 3 characters long",
    })
    .max(32, {
      message: "Departure port must be at most 32 characters long",
    }),
  cruise_price: z.string().trim(),
  map_image: z.any(),
  cruise_image: z.any(),
});

export const cruiseBookingSchema = z.object({
  cruise_name: z.string(),
  phone_number: z.string(),
  cruise_payment_amount: z.string().optional(),
  cruise_payment_method: z.string().optional(),
  cruise_number_of_adults: z.string(),
  cruise_number_of_kids: z.string(),
});

export const cruiseBookingPaymentSchema = z.object({
  cruise_payment_amount: z.string(),
  cruise_payment_method: z.string(),
});
