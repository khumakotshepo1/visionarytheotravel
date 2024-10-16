import { sql } from "@/database";
import { cache } from "react";

export const getAllPromotions = cache(async (): Promise<PromotionsPropsType[]> => {
  try {
    const { rows } = await sql.query<PromotionsPropsType>(`
      SELECT * FROM promotions
    `)

    return rows || null

  } catch (e) {
    throw new Error("Could not fetch promotions")
  }

})

export const getPromotionByName = cache(async (promotion_name: string): Promise<PromotionsPropsType> => {
  try {
    const { rows } = await sql.query<PromotionsPropsType>(`
      SELECT * FROM promotions WHERE promotion_name = $1
    `, [promotion_name])

    return rows[0] || null

  } catch (e) {
    throw new Error("Could not fetch promotio by name")
  }

})

export const getPromotionById = cache(async (promotionId: number): Promise<PromotionsPropsType> => {
  try {
    const { rows } = await sql.query<PromotionsPropsType>(`
      SELECT * FROM promotions WHERE promotion_id = $1
    `, [promotionId])

    return rows[0] || null

  } catch (e) {
    throw new Error("Could not fetch promotion by id")
  }

})
