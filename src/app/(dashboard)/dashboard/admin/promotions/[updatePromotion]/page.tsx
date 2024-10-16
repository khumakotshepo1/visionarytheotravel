import { UpdatePromotionForm } from "@/components/_dashboard/_promotions/UpdatePromotionForm";
import { getPromotionById } from "@/server/promotions.server";

export default async function UpdatePromotionPage({ params }: { params: { updatePromotion: string } }) {

  const promotionSlug = parseInt(params.updatePromotion);

  const promotion = await getPromotionById(promotionSlug) as PromotionsPropsType

  return <><UpdatePromotionForm promotion={promotion} /></>;
}
