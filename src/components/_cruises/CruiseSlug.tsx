import { CalendarIcon, MapPinIcon, MoonIcon, ShipIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TableDemo } from "../Table";
import { Cabins } from "./Cabins";
import { cabinsApi } from "./cabins-api";

export function CruiseSlug() {
  return (
    <>
      <section className="flex flex-col lg:flex-row justify-center md:items-center lg:items-start gap-2 font-anton">
        <article className="h-96 w-full relative">
          <Image
            src={"/images/cruises/msc-hero.jpg"}
            alt="msc-hero"
            fill
            className="object-cover"
          />
          <div className="absolute top-0 left-0 bg-background p-4 rounded-br-xl">
            <p className="font-semibold text-xl md:text-2xl">
              Portugues Island
            </p>
          </div>
        </article>
        <article className="w-full lg:w-1/2 px-4">
          <h1 className="text-3xl font-bold pb-4">Durban Port</h1>

          {/*cruise info div*/}
          <div className="flex justify-between items-center w-full border-b-2 border-foreground py-4">
            <div className="flex flex-col gap-2 text-base">
              <span className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <p>01 Jan 2025</p>
              </span>
              <span className="flex items-center gap-2">
                <MoonIcon className="h-4 w-4" />
                <p>3 Nights</p>
              </span>
              <span className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4" />
                <p>Mozambique</p>
              </span>
              <span className="flex items-center gap-2">
                <ShipIcon className="h-4 w-4" />
                <p>MSC Musica</p>
              </span>
            </div>

            <Image
              src={"/logos/msc-logo-blue.png"}
              alt="msc-hero"
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
                <p>R3000/per person</p>
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
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <TableDemo />
          <Image
            src={"/images/cruises/maps/pom_port-map.png"}
            alt="map"
            width={500}
            height={300}
          />
        </div>
      </section>

      <section className="py-20 px-4 font-anton">
        <h2 className="text-4xl py-4">Cabins</h2>
        <Cabins cabins={cabinsApi} />
      </section>
    </>
  );
}
