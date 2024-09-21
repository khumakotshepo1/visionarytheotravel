import { shipColumns } from "@/components/_dashboard/_cruises-admin/_ships/ship-columns";
import { ShipForm } from "@/components/_dashboard/_cruises-admin/_ships/ShipForm";
import { DataTable } from "@/components/DataTable";
import {
  getAllShips,
  getMscShipsClasses,
  getMscShipsNames,
} from "@/server/ships.server";
import { ShipType } from "@/zod/types/ship.type";

type ShipClass = { class: string };
type ShipName = { name: string };

export default async function ShipsPage() {
  const ships = (await getAllShips()) as ShipType[];
  const shipsClasses = (await getMscShipsClasses()) as ShipClass[];
  const shipsNames = (await getMscShipsNames()) as ShipName[];

  return (
    <div>
      <section className="flex justify-end items-center p-4">
        <ShipForm shipsClasses={shipsClasses} shipsNames={shipsNames} />
      </section>
      <section>
        <DataTable columns={shipColumns} data={ships} />
      </section>
    </div>
  );
}
