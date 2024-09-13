import { CruiseType } from "@/components/_cruises/Cruise";
import { januaryCruiseApi } from "@/components/_cruises/cruise-api";
import { CruiseSlug } from "@/components/_cruises/CruiseSlug";

export default function CruiseSlugPage({
  params,
}: {
  params: { cruiseSlug: string };
}) {
  const cruiseSlug = Number(params.cruiseSlug);

  console.log({ cruiseSlug });

  const cruise = januaryCruiseApi.find(
    (cruise) => cruise.id === cruiseSlug
  ) as CruiseType;

  return (
    <>
      <CruiseSlug cruise={cruise} />
    </>
  );
}
