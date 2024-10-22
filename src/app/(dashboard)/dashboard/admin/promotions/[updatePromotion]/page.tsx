import { UpdatePromotionForm } from "@/components/_dashboard/_promotions/UpdatePromotionForm";
import { getPromotionById } from "@/server/promotions.server";

type Params = Promise<{ updatePromotion: string }>;

export default async function UpdatePromotionPage(props: { params: Params }) {
  const params = await props.params;

  const promotionSlug = parseInt(params.updatePromotion);

  const promotion = await getPromotionById(promotionSlug) as PromotionsPropsType

  return <><UpdatePromotionForm promotion={promotion} /></>;
}
