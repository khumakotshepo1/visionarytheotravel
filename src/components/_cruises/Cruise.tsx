"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";

type CruiseProps = {
  cruises: CruisePropsType[];
  cruiseDates: CruiseDatePropsType[];
  title: string;
};

export function Cruise({ cruises, cruiseDates, title }: CruiseProps) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const handlePrevious = useCallback(() => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? cruises.length - 1 : prevSlide - 1
    );
  }, [cruises.length]);

  const handleNext = useCallback(() => {
    setCurrentSlide((prevSlide) =>
      prevSlide === cruises.length - 1 ? 0 : prevSlide + 1
    );
  }, [cruises.length]);

  if (cruises.length === 0) return <p>No cruise available.</p>;

  return (
    <>
      <h1 className="text-3xl py-4 font-bold">{title}</h1>

      {/* Mobile Carousel */}
      <div className="lg:hidden relative overflow-hidden" aria-live="polite">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentSlide * 100}vw)`,
          }}
        >
          {cruises.map((cruise) => {
            const correspondingDates = cruiseDates.filter(
              (date) => date.cruise_id === cruise.cruise_id
            );

            return correspondingDates.map((date) => (
              <Link
                href={`/cruises/${date.cruise_date_id}`}
                key={date.cruise_date_id}
                className="flex flex-shrink-0 w-screen"
              >
                <div className="flex flex-col gap-2 w-full relative">
                  <Image
                    src={cruise.cruise_image}
                    alt={cruise.cruise_name}
                    width={300}
                    height={300}
                    className="object-cover w-full h-52"
                    loading="lazy"
                  />
                  <div className="flex flex-col gap-2 relative">
                    <h3 className="text-lg font-semibold bg-background">{cruise.cruise_name}</h3>
                    <p className="bg-background text-xs">{cruise.description}</p>
                    <span className="flex items-center gap-2 text-sm">
                      <p className="bg-background">
                        {date.duration} Nights, {parseInt(date.duration) + 1} Days
                      </p>
                      <div className="w-1.5 h-1.5 rounded-xl bg-foreground" />
                      <p className="p-3 bg-background">
                        {new Date(date.embarkation_date).toLocaleDateString()}
                      </p>
                    </span>
                    <span className="py-3 text-crimsonElement font-bold flex items-center justify-start rounded-xl w-full">
                      R{date.cruise_price}
                    </span>
                  </div>
                </div>
              </Link>
            ));
          })}
        </div>

        <button
          onClick={handlePrevious}
          aria-label="Previous slide"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-200"
        >
          <ArrowLeftIcon />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-200"
        >
          <ArrowRightIcon />
        </button>
      </div>

      {/* Desktop Grid */}
      <div className="hidden lg:flex flex-wrap gap-4">
        {cruises.map((cruise) => {
          const correspondingDates = cruiseDates.filter(
            (date) => date.cruise_id === cruise.cruise_id
          );

          return correspondingDates.map((date) => (
            <Link
              href={`/cruises/${date.cruise_date_id}`}
              key={date.cruise_date_id}
              className="flex flex-col gap-2 max-w-[350px]"
            >
              <Image
                src={cruise.cruise_image}
                alt={cruise.cruise_name}
                width={300}
                height={300}
                className="object-cover h-52 rounded-xl"
                loading="lazy"
              />
              <div className="flex flex-col gap-2 relative">
                <h3 className="text-lg font-semibold bg-background">{cruise.cruise_name}</h3>
                <p className="bg-background text-xs">{cruise.description}</p>
                <span className="flex items-center gap-2 text-sm">
                  <p className="bg-background">
                    {date.duration} Nights, {parseInt(date.duration) + 1} Days
                  </p>
                  <div className="w-1.5 h-1.5 rounded-xl bg-foreground" />
                  <p className="bg-background">
                    {new Date(date.embarkation_date).toDateString()}
                  </p>
                </span>
                <span className="py-3 text-crimsonElement font-bold flex items-center justify-start rounded-xl w-full">
                  R{date.cruise_price}
                </span>
              </div>
            </Link>
          ));
        })}
      </div>
    </>
  );
}
