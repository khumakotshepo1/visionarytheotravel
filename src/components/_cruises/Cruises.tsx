import { Cruise } from "./Cruise";
import { HeroNoButton } from "../carousel/HeroNoButton";
import { getAllCruises } from "@/server/cruises.server";
import { format } from "date-fns";

export async function Cruises() {
  const cruises = (await getAllCruises()) as CruisePropsType[];

  // Group cruises by embarkation month and year
  const groupedCruises: { [key: string]: CruisePropsType[] } = {};

  cruises.forEach((cruise) => {
    const embarkationDate = cruise.embarkation_date; // Assuming this is already a Date object
    const monthYear = format(embarkationDate, "MMMM yyyy"); // e.g., "October 2024"

    // Initialize the array if it doesn't exist
    if (!groupedCruises[monthYear]) {
      groupedCruises[monthYear] = [];
    }
    // Push the cruise into the corresponding month/year array
    groupedCruises[monthYear].push(cruise);
  });

  return (
    <>
      <section>
        <HeroNoButton image="/images/cruises/msc-hero.jpg" title="Cruises" />
      </section>
      <section className="flex flex-col gap-12 p-4">
        {Object.keys(groupedCruises).map((monthYear) => (
          <div key={monthYear} className="border-b-4 border-foreground py-4">
            <Cruise
              cruise={groupedCruises[monthYear]}
              title={`Cruises for ${monthYear}`}
            />
          </div>
        ))}
      </section>
    </>
  );
}
