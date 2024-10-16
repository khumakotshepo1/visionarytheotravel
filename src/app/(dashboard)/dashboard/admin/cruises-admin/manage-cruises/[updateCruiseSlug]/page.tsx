import { UpdateCruisesForm } from "@/components/_dashboard/_cruises-admin/_cruises/UpdateCruiseForm";
import { getCruiseById, getCruiseDateById, getShipById } from "@/server/cruises.server";

export default async function UpdateCruisePage({ params }: { params: { updateCruiseSlug: string } }) {

  const cruiseDateSlug = parseInt(params.updateCruiseSlug);
  const cruiseDate = await getCruiseDateById(cruiseDateSlug) as CruiseDatePropsType;

  console.log({ cruiseDate })

  const cruiseId = parseInt(cruiseDate?.cruise_id)
  const shipId = parseInt(cruiseDate?.ship_id)

  const ship = await getShipById(shipId) as ShipPropsType;

  console.log({ cruiseId })
  console.log({ ship })

  const cruise = await getCruiseById(cruiseId) as CruisePropsType;

  console.log({ cruise })

  return <><UpdateCruisesForm cruise={cruise} cruiseDate={cruiseDate} ship={ship} /></>
}
