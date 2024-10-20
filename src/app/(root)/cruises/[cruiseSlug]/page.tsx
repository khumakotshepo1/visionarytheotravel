import { CruiseSlug } from "@/components/_cruises/CruiseSlug";
import { getCruiseById, getCruiseDateById, getShipById } from "@/server/cruises.server";

export default async function CruiseSlugPage({
  params,
}: {
  params: { cruiseSlug: string };
}) {
  const cruiseSlug = parseInt(params.cruiseSlug);

  const cruiseDate = (await getCruiseDateById(cruiseSlug)) as CruiseDatePropsType;
  const ship = await getShipById(parseInt(cruiseDate.ship_id)) as ShipPropsType;

  console.log('Cruise Date:', cruiseDate);
  console.log('Ship:', ship);

  const cruise = (await getCruiseById(Number(cruiseDate.cruise_id))) as CruisePropsType;
  return (
    <>
      <CruiseSlug cruise={cruise} cruiseDate={cruiseDate} ship={ship} />
    </>
  );
}
