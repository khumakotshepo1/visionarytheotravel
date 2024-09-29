import { CabinForm } from "@/components/_dashboard/_cruises-admin/_cabins/CabinForm";
import { cabinColumns } from "@/components/_dashboard/_cruises-admin/_cabins/cabins-columns";

import { getAllCabins, getAllShips } from "@/server/cruises.server";
import { CabinsTable } from "./CabinsTable";

export async function Cabins() {
  const cabins = (await getAllCabins()) as CabinPropsType[];
  const ships = (await getAllShips()) as ShipPropsType[];

  return (
    <>
      <section className="flex justify-end items-center p-4">
        <CabinForm ships={ships} />
      </section>
      <section>
        <CabinsTable columns={cabinColumns} data={cabins} />
      </section>
    </>
  );
}
