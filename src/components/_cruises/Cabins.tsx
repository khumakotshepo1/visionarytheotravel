"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";

export function Cabins({ cabins }: { cabins: CabinPropsType[] }) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

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

  if (cabins.length === 0) return <p className="font-bold">No cabins found</p>;

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
            <div key={cabin.cabin_name} className="flex flex-shrink-0 w-screen">
              <div className="flex flex-col gap-2 w-full relative">
                <Image
                  src={cabin.cabin_image}
                  alt={cabin.cabin_name}
                  width={300}
                  height={300}
                  className="object-cover w-full h-auto"
                  loading="lazy"
                />
                <h3 className="text-lg font-semibold p-3 bg-background absolute left-0 bottom-0">
                  {cabin.cabin_name}
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
          <div key={cabin.cabin_name} className="flex flex-col gap-2">
            <Image
              src={cabin.cabin_image}
              alt={cabin.cabin_name}
              width={300}
              height={300}
              className="object-cover"
              loading="lazy" // Add lazy loading
            />
            <h3 className="text-lg font-semibold">{cabin.cabin_name}</h3>
          </div>
        ))}
      </div>
    </>
  );
}
