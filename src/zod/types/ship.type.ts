import { z } from "zod";
import { cabinSchema, shipSchema } from "../schemas/cruise.schema";

export type ShipType = z.infer<typeof shipSchema>;
export type CabinType = z.infer<typeof cabinSchema>;
