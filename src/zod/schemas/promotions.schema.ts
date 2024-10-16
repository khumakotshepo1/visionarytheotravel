import { z } from "zod";

export const promotionsSchema = z.object({
  promotion_name: z.string(),
  promotion_url: z.string(),
  promotion_image: z.any(),
})
