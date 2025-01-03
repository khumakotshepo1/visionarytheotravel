import { CabinForm } from "@/components/_dashboard/_cruises-admin/_cabins/CabinForm";
import { getAllShips } from "@/server/cruises.server";

export default async function page() {
  const ships = await getAllShips() as ShipPropsType[];

  return (
    <>
      <CabinForm ships={ships} />
    </>
  );
}
