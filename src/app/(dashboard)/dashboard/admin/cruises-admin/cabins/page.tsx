import { CabinForm } from "@/components/_dashboard/_cruises-admin/_cabins/CabinForm";
import { cabinColumns } from "@/components/_dashboard/_cruises-admin/_cabins/cabins-columns";

import { DataTable } from "@/components/DataTable";
import { getAllCabins, getMscShipsNames } from "@/server/ships.server";

type ShipNames = { name: string };

type CabinDataType = {
  cabin_id: string;
  ship_id: string;
  name: string;
  image: string;
  ship: string;
  type: string;
};

export default async function CabinsPage() {
  const cabins = (await getAllCabins()) as CabinDataType[];
  const shipsNames = (await getMscShipsNames()) as ShipNames[];

  console.log({ cabins });

  return (
    <div>
      <section className="flex justify-end items-center p-4">
        <CabinForm shipsNames={shipsNames} />
      </section>
      <section>
        <DataTable columns={cabinColumns} data={cabins} />
      </section>
    </div>
  );
}
