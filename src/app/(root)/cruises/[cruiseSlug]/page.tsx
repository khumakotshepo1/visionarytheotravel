import { CruiseSlug } from "@/components/_cruises/CruiseSlug";
import { getCruiseById, getCruiseDateById } from "@/server/cruises.server";

export default async function CruiseSlugPage({
  params,
}: {
  params: { cruiseSlug: string };
}) {
  const cruiseSlug = parseInt(params.cruiseSlug);

  const cruiseDate = (await getCruiseDateById(cruiseSlug)) as CruiseDatePropsType;

  console.log('Cruise Date:', cruiseDate);

  const cruise = (await getCruiseById(Number(cruiseDate.cruise_id))) as CruisePropsType;
  return (
    <>
      <CruiseSlug cruise={cruise} cruiseDate={cruiseDate} />
    </>
  );
}
