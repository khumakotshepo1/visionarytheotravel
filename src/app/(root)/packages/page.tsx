import { HeroNoButton } from "@/components/carousel/HeroNoButton";

export default function PackagesPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <HeroNoButton image="/images/packages/tourism-day.jpg" title="Cruises" />
        <div className="absolute inset-0 flex justify-center items-center bg-black/80 font-bolder text-5xl lg:text-7xl font-anton">Coming Soon</div>
      </section>
    </>
  );
}
