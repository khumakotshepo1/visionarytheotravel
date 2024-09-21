"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { musicaCabinsApi } from "./cabins-api";

export type CabinType = {
  name: string;
  image: string;
};

export function Cabins({ ship }: { ship: string }) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  let cabins: CabinType[] = [];

  if (ship === "MSC Musica") {
    cabins = musicaCabinsApi;
  }

  const handlePrevious = useCallback(() => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? cabins.length - 1 : prevSlide - 1
    );
  }, [cabins.length]);

  const handleNext = useCallback(() => {
    setCurrentSlide((prevSlide) =>
      prevSlide === cabins.length - 1 ? 0 : prevSlide + 1
    );
  }, [cabins.length]);

  if (cabins.length === 0) return <p>No cabins available.</p>;

  return (
    <>
      {/* Mobile Carousel */}
      <div className="lg:hidden relative overflow-hidden" aria-live="polite">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentSlide * 100}vw)`,
          }}
        >
          {cabins.map((cabin) => (
            <div key={cabin.name} className="flex flex-shrink-0 w-screen">
              <div className="flex flex-col gap-2 w-full relative">
                <Image
                  src={cabin.image}
                  alt={cabin.name}
                  width={300}
                  height={300}
                  className="object-cover w-full h-auto"
                  loading="lazy"
                />
                <h3 className="text-lg font-semibold p-3 bg-background absolute left-0 bottom-0">
                  {cabin.name}
                </h3>
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
        {cabins.map((cabin) => (
          <div key={cabin.name} className="flex flex-col gap-2">
            <Image
              src={cabin.image}
              alt={cabin.name}
              width={300}
              height={300}
              className="object-cover"
              loading="lazy" // Add lazy loading
            />
            <h3 className="text-lg font-semibold">{cabin.name}</h3>
          </div>
        ))}
      </div>
    </>
  );
}