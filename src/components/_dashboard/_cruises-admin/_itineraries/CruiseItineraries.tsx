import { DataTable } from "@/components/DataTable";
import {
  getAllCruiseItineraries,
  getAllCruises,
} from "@/server/cruises.server";
import { CruiseItineraryForm } from "./CruiseItineraryForm";
import { cruiseItineraryColumns } from "./itinerary-columns";

export async function CruiseItineraries() {
  const cruises = (await getAllCruises()) as CruisePropsType[];
  const cruiseItineraries =
    (await getAllCruiseItineraries()) as CruiseItineraryPropsType[];

  console.log({ cruiseItineraries });
  return (
    <>
      <section className="flex justify-end items-center p-4">
        <CruiseItineraryForm cruises={cruises} />
      </section>
      <section>
        <DataTable columns={cruiseItineraryColumns} data={cruiseItineraries} />
      </section>
    </>
  );
}
