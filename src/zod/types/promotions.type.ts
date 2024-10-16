import { z } from "zod";
import { promotionsSchema } from "../schemas/promotions.schema";

export type PromotionsType = z.infer<typeof promotionsSchema>;
