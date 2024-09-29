import { getAllCruises, getAllShips } from "@/server/cruises.server";
import { CruisesForm } from "./CruisesForm";
import { cruiseColumns } from "./cruise-columns";
import { CruisesTable } from "./CruisesTable";

export async function Cruises() {
  const cruises = (await getAllCruises()) as CruisePropsType[];
  const ships = (await getAllShips()) as ShipPropsType[];

  return (
    <>
      <section className="flex justify-end items-center p-4">
        <CruisesForm ships={ships} />
      </section>
      <section>
        <CruisesTable columns={cruiseColumns} data={cruises} />
      </section>
    </>
  );
}
