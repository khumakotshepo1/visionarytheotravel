import { Cruise } from "./Cruise";
import { HeroNoButton } from "../carousel/HeroNoButton";
import { getAllCruises, getCruiseDateByCruiseId } from "@/server/cruises.server";
import { format } from "date-fns";

export async function Cruises() {
  const cruises = (await getAllCruises()) as CruisePropsType[];

  // Group cruises by embarkation month and year
  const groupedCruises: { [key: string]: { cruise: CruisePropsType; cruiseDates: CruiseDatePropsType[] }[] } = {};

  for (const cruise of cruises) {
    const cruiseDates = await getCruiseDateByCruiseId(Number(cruise.cruise_id)) as CruiseDatePropsType[];

    // Flatten if cruiseDates is nested
    const flatCruiseDates = Array.isArray(cruiseDates) && Array.isArray(cruiseDates[0]) ? cruiseDates.flat() : cruiseDates;

    for (const cruiseDate of flatCruiseDates) {
      const embarkationDate = new Date(cruiseDate.embarkation_date);
      if (isNaN(embarkationDate.getTime())) {
        continue; // Skip if it's not a valid date
      }

      const monthYear = format(embarkationDate, "MMMM yyyy");

      // Initialize the array if it doesn't exist
      if (!groupedCruises[monthYear]) {
        groupedCruises[monthYear] = [];
      }

      // Push the cruise and its corresponding dates into the array
      groupedCruises[monthYear].push({ cruise, cruiseDates: flatCruiseDates.filter(date => date.cruise_date_id === cruiseDate.cruise_date_id) });
    }
  }

  return (
    <>
      <section>
        <HeroNoButton image="/images/cruises/msc-hero.jpg" title="Cruises" />
      </section>
      <section className="flex flex-col gap-12 p-4">
        {Object.keys(groupedCruises).map((monthYear) => (
          <div key={monthYear} className="border-b-4 border-foreground py-4">
            <Cruise
              cruises={groupedCruises[monthYear].map(item => item.cruise)} // Pass the cruises
              cruiseDates={groupedCruises[monthYear].flatMap(item => item.cruiseDates)} // Flatten and pass the cruiseDates
              title={`Cruises for ${monthYear}`}
            />
          </div>
        ))}
      </section>
    </>
  );
}
