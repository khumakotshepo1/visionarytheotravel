import { DataTable } from "@/components/DataTable";
import { getAllCruises, getAllShips } from "@/server/cruises.server";
import { CruisesForm } from "./CruisesForm";
import { cruiseColumns } from "./cruise-columns";

export async function Cruises() {
  const cruises = (await getAllCruises()) as CruisePropsType[];
  const ships = (await getAllShips()) as ShipPropsType[];

  console.log({ cruises });

  return (
    <>
      <section className="flex justify-end items-center p-4">
        <CruisesForm ships={ships} />
      </section>
      <section>
        <DataTable columns={cruiseColumns} data={cruises} />
      </section>
    </>
  );
}
