import { homeHeroApi } from "@/components/_home/home-hero-api";

import { Carousel } from "@/components/carousel/Carousel";
import { useIsOnline } from "@/components/useIsOnline";

export default function HomePage() {


  return (
    <>
      <section>
        <Carousel slides={homeHeroApi} />
      </section>
    </>
  );
}
