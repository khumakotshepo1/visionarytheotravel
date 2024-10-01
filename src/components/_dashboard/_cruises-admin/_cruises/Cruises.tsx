import { getAllCruises } from "@/server/cruises.server";

import { cruiseColumns } from "./cruise-columns";
import { CruisesTable } from "./CruisesTable";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export async function Cruises() {
  const cruises = (await getAllCruises()) as CruisePropsType[];

  return (
    <>
      <section className="flex justify-end items-center p-4">
        <Link href="/dashboard/admin/cruises-admin/manage-cruises/add-cruise">
          <Button
            variant="outline"
            className="bg-orangeElement dark:bg-orangeElement text-lightElement dark:text-lightElement"
          >
            Add Cruise
          </Button>
        </Link>
      </section>
      <section>
        <CruisesTable columns={cruiseColumns} data={cruises} />
      </section>
    </>
  );
}
