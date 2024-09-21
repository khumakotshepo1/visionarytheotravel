"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";

export type cruiseIteneraryProps = {
  day: string;
  date: string;
  location: string;
  arrive: string;
  depart: string;
};

export type CruiseType = {
  id: number;
  image: string;
  ship: string;
  name: string;
  nights: string;
  description: string;
  price: number;
  date: string;
  cruiseItenerary: cruiseIteneraryProps[];
};

type cruiseProps = {
  cruise: CruiseType[];
  title: string;
};

export function Cruise({ cruise, title }: cruiseProps) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const handlePrevious = useCallback(() => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? cruise.length - 1 : prevSlide - 1
    );
  }, [cruise.length]);

  const handleNext = useCallback(() => {
    setCurrentSlide((prevSlide) =>
      prevSlide === cruise.length - 1 ? 0 : prevSlide + 1
    );
  }, [cruise.length]);

  if (cruise.length === 0) return <p>No cruise available.</p>;

  return (
    <>
      <h1 className="text-3xl font-anton py-4">{title}</h1>
      {/* Mobile Carousel */}
      <div className="lg:hidden relative overflow-hidden" aria-live="polite">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentSlide * 100}vw)`,
          }}
        >
          {cruise.map((cruise) => (
            <div key={cruise.id} className="flex flex-shrink-0 w-screen">
              <div className="flex flex-col gap-2 w-full relative">
                <Image
                  src={cruise.image}
                  alt={cruise.name}
                  width={300}
                  height={300}
                  className="object-cover w-full h-52"
                  loading="lazy"
                />
                <div className="font-anton flex flex-col gap-2 relative">
                  <h3 className="text-lg font-semibold  bg-background">
                    {cruise.name}
                  </h3>
                  <p className="bg-background text-xs">{cruise.description}</p>
                  <span className="flex items-center gap-2 text-sm">
                    <p className="bg-background">{cruise.nights}</p>
                    <div className="w-1.5 h-1.5 rounded-xl bg-foreground" />
                    <p className="p-3 bg-background">{cruise.date}</p>
                  </span>
                  <Link href={`/cruises/${cruise.id}`}>
                    <button className="p-3 bg-foreground text-background flex items-center justify-center rounded-xl text-sm font-semibold w-3/5">
                      R{cruise.price}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
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
        {cruise.map((cruise) => (
          <div key={cruise.id} className="flex flex-col gap-2">
            <Image
              src={cruise.image}
              alt={cruise.name}
              width={300}
              height={300}
              className="object-cover h-52 rounded-xl"
              loading="lazy" // Add lazy loading
            />
            <div className="font-anton flex flex-col gap-2 relative">
              <h3 className="text-lg font-semibold  bg-background">
                {cruise.name}
              </h3>
              <p className="bg-background text-xs">{cruise.description}</p>
              <span className="flex items-center gap-2 text-sm">
                <p className="bg-background">{cruise.nights}</p>
                <div className="w-1.5 h-1.5 rounded-xl bg-foreground" />
                <p className="p-3 bg-background">{cruise.date}</p>
              </span>
              <Link href={`/cruises/${cruise.id}`}>
                <button className="p-3 bg-foreground text-background flex items-center justify-center rounded-xl text-sm font-semibold w-3/5">
                  R{cruise.price}
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}