import { z } from "zod";
import {
  cabinSchema,
  cruiseBookingPaymentSchema,
  cruiseBookingSchema,
  cruiseItinerarySchema,
  cruiseSchema,
  shipSchema,
} from "../schemas/cruise.schema";

export type ShipType = z.infer<typeof shipSchema>;
export type CabinType = z.infer<typeof cabinSchema>;
export type CruiseItineraryType = z.infer<typeof cruiseItinerarySchema>;
export type CruiseType = z.infer<typeof cruiseSchema>;
export type CruiseBookingType = z.infer<typeof cruiseBookingSchema>;
export type CruiseBookingPaymentType = z.infer<
  typeof cruiseBookingPaymentSchema
>;
