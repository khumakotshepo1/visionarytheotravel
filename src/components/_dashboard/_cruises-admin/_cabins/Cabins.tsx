import { CabinForm } from "@/components/_dashboard/_cruises-admin/_cabins/CabinForm";
import { cabinColumns } from "@/components/_dashboard/_cruises-admin/_cabins/cabins-columns";

import { DataTable } from "@/components/DataTable";
import { getAllCabins } from "@/server/cruises.server";

export async function Cabins() {
  const cabins = (await getAllCabins()) as CabinPropsType[];

  return (
    <>
      <section className="flex justify-end items-center p-4">
        <CabinForm />
      </section>
      <section>
        <DataTable columns={cabinColumns} data={cabins} />
      </section>
    </>
  );
}
