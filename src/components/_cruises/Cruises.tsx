import { Cruise } from "./Cruise";

import { HeroNoButton } from "../carousel/HeroNoButton";
import { januaryCruiseApi } from "./cruise-api";

export function Cruises() {
  return (
    <>
      <section>
        <HeroNoButton image="/images/cruises/msc-hero.jpg" title="Cruises" />
      </section>
      <section className="flex flex-col gap-2 p-4">
        <Cruise cruise={januaryCruiseApi} title="Janury 2025" />
      </section>
    </>
  );
}
