import { Carousel } from "@/components/carousel/Carousel";
import { getAllPromotions } from "@/server/promotions.server";

export default async function HomePage() {

  const promotions = await getAllPromotions() as PromotionsPropsType[];

  return (
    <>
      <section>
        <Carousel slides={promotions} />
      </section>
    </>
  );
}
