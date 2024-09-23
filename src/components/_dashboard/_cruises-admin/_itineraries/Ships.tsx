import { shipColumns } from "@/components/_dashboard/_cruises-admin/_ships/ship-columns";
import { ShipForm } from "@/components/_dashboard/_cruises-admin/_ships/ShipForm";
import { DataTable } from "@/components/DataTable";
import { getAllShips } from "@/server/cruises.server";

export async function Ships() {
  const ships = (await getAllShips()) as ShipPropsType[];
  return (
    <>
      <section className="flex justify-end items-center p-4">
        <ShipForm />
      </section>
      <section>
        <DataTable columns={shipColumns} data={ships} />
      </section>
    </>
  );
}
