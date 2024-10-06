import { shipColumns } from "@/components/_dashboard/_cruises-admin/_ships/ship-columns";

import { getAllShips } from "@/server/cruises.server";
import { ShipsTable } from "./ShipsTable";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export async function Ships() {
  const ships = (await getAllShips()) as ShipPropsType[];

  return (
    <>
      <section className="flex justify-end items-center p-4">
        <Link href="/dashboard/admin/cruises-admin/ships/add-ship">
          <Button
            variant="outline"
            className="bg-crimsonElement dark:bg-crimsonElement text-lightElement dark:text-lightElement"
          >
            Add Ship
          </Button>
        </Link>
      </section>
      <section>
        <ShipsTable columns={shipColumns} data={ships} />
      </section>
    </>
  );
}
