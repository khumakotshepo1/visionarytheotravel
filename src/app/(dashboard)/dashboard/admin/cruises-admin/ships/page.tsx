import { shipColumns } from "@/components/_dashboard/_cruises-admin/_ships/ship-columns";
import { ShipForm } from "@/components/_dashboard/_cruises-admin/_ships/ShipForm";
import { DataTable } from "@/components/DataTable";
import { getAllShips } from "@/server/ships.server";
import { ShipType } from "@/zod/types/ship.type";

export default async function ShipsPage() {
  const ships = (await getAllShips()) as ShipType[];
  [];

  return (
    <div>
      <section className="flex justify-end items-center p-4">
        <ShipForm />
      </section>
      <section>
        <DataTable columns={shipColumns} data={ships} />
      </section>
    </div>
  );
}
