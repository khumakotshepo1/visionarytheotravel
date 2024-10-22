import { UpdateCruisesForm } from "@/components/_dashboard/_cruises-admin/_cruises/UpdateCruiseForm";
import { getCruiseById, getCruiseDateById, getShipById } from "@/server/cruises.server";

type Params = Promise<{ updateCruiseSlug: string }>;

export default async function UpdateCruisePage(props: { params: Params }) {
  const params = await props.params;
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
