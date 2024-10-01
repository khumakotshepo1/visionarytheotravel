import { CruisesForm } from "@/components/_dashboard/_cruises-admin/_cruises/CruisesForm";

import { getAllShips } from "@/server/cruises.server";

export default async function AddCruisePage() {
  const ships = (await getAllShips()) as ShipPropsType[];

  return (
    <>
      <CruisesForm ships={ships} />
    </>
  );
}
