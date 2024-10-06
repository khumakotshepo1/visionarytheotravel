import { cabinColumns } from "@/components/_dashboard/_cruises-admin/_cabins/cabins-columns";

import { getAllCabins } from "@/server/cruises.server";
import { CabinsTable } from "./CabinsTable";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export async function Cabins() {
  const cabins = (await getAllCabins()) as CabinPropsType[];

  return (
    <>
      <section className="flex justify-end items-center p-4">
        <Link href="/dashboard/admin/cruises-admin/cabins/add-cabin">
          <Button
            variant="outline"
            className="bg-crimsonElement dark:bg-crimsonElement text-lightElement dark:text-lightElement"
          >
            Add Cabin
          </Button>
        </Link>
      </section>
      <section>
        <CabinsTable columns={cabinColumns} data={cabins} />
      </section>
    </>
  );
}
