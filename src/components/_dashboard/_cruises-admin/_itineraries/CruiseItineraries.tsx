import { CruiseItineraryForm } from "./CruiseItineraryForm";
import { cruiseItineraryColumns } from "./itinerary-columns";
import { CruiseItineraryTable } from "./CruiseItineraryTable";
import {
  getAllCruiseItineraries,
  getAllCruises,
} from "@/server/cruises.server";

export async function CruiseItineraries() {
  const cruises = (await getAllCruises()) as CruisePropsType[];
  const cruiseItineraries =
    (await getAllCruiseItineraries()) as CruiseItineraryPropsType[];

  return (
    <>
      <section className="flex justify-end items-center p-4">
        <CruiseItineraryForm cruises={cruises} />
      </section>
      <section>
        <CruiseItineraryTable
          columns={cruiseItineraryColumns}
          data={cruiseItineraries}
        />
      </section>
    </>
  );
}
