import { CalendarIcon, MapPinIcon, MoonIcon, ShipIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ItineraryTable } from "../ItineraryTable";
import { Cabins } from "./Cabins";
import {
  getCabinsByShipId,
  getCruiseItinerariesByCruiseId,
} from "@/server/cruises.server";

export async function CruiseSlug({ cruise }: { cruise: CruisePropsType }) {
  const shipId = parseInt(cruise.ship_id);
  const cruiseId = parseInt(cruise.cruise_id);

  const cabins = (await getCabinsByShipId(shipId)) as CabinPropsType[];
  const itinerary = await getCruiseItinerariesByCruiseId(cruiseId);

  console.log({ itinerary });

  return (
    <>
      <section className="flex flex-col lg:flex-row justify-center md:items-center lg:items-start gap-2 font-anton">
        <article className="h-96 w-full relative">
          <Image
            src={cruise.cruise_image}
            alt={cruise.cruise_name}
            fill
            className="object-cover"
          />
          <div className="absolute top-0 left-0 bg-background p-4 rounded-br-xl">
            <p className="font-semibold text-xl md:text-2xl">
              {cruise.cruise_name}
            </p>
          </div>
        </article>
        <article className="w-full lg:w-1/2 px-4">
          <h1 className="text-3xl font-bold pb-4 capitalize">
            {cruise.departure_port} port
          </h1>

          {/*cruise info div*/}
          <div className="flex justify-between items-center w-full border-b-2 border-foreground py-4">
            <div className="flex flex-col gap-2 text-base">
              <span className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <p>
                  {cruise.embarkation_date.toDateString()} -{" "}
                  {cruise.disembarkation_date.toDateString()}
                </p>
              </span>
              <span className="flex items-center gap-2">
                <MoonIcon className="h-4 w-4" />
                <p>
                  {cruise.duration} nights, {parseInt(cruise.duration) + 1} days
                </p>
              </span>
              <span className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4" />
                <p>{cruise.cruise_name}</p>
              </span>
              <span className="flex items-center gap-2">
                <ShipIcon className="h-4 w-4" />
                <p>{cruise.ship_name}</p>
              </span>
            </div>

            <Image
              src={"/logos/msc-logo-blue.png"}
              alt="msc logo"
              width={120}
              height={40}
              className="bg-lightElement rounded-xl p-4"
            />
          </div>

          {/*prices info div*/}
          <div className="flex flex-col gap-4 py-8">
            <div className="flex gap-2 justify-between">
              <span>
                <p className="text-sm capitalize">inside</p>
                <p>{cruise.cruise_price}/per person</p>
              </span>
              <span>
                <p className="text-sm capitalize">ocean view</p>
                <p>R3000/per person</p>
              </span>
            </div>
            <div className="flex gap-2 justify-between">
              <span>
                <p className="text-sm capitalize">balcony</p>
                <p>R3000/per person</p>
              </span>
              <span>
                <p className="text-sm capitalize">balcony suite</p>
                <p>R3000/per person</p>
              </span>
            </div>
          </div>

          {/*quote div*/}
          <div className="flex flex-col gap-2 text-base">
            <Link href={"/"}>
              <button className="w-full md:w-1/2 p-2 rounded-xl bg-foreground text-background">
                Get Quotation
              </button>
            </Link>
            <Link href={"/"}>
              <button className="w-full md:w-1/2 p-2 rounded-xl border-2 border-foreground">
                Call 0212345678
              </button>
            </Link>
          </div>
        </article>
      </section>
      <section className="py-20 px-4 font-anton">
        <h2 className="text-4xl py-4">Itenerary</h2>
        <div className="flex flex-col lg:flex-row lg:justify-between gap-16 items-center lg:h-80">
          <ItineraryTable itenerary={itinerary} />
          <Image
            src={cruise.map_image}
            alt={`${cruise.cruise_name} map`}
            width={500}
            height={200}
            className="max-lg:w-80 h-full object-cover"
          />
        </div>
      </section>

      <section className="py-20 px-4 font-anton">
        <h2 className="text-4xl py-4">Cabins</h2>
        <Cabins cabins={cabins} />
      </section>
    </>
  );
}
