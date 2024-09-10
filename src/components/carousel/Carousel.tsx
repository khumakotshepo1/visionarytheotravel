"use client";

import Image from "next/image";
import { useState, useCallback, useEffect, memo } from "react";
// import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export type HeroCarouselType = {
  title: string;
  image: string;
  link: string;
  cta: string;
};

type CarouselProps = {
  slides: HeroCarouselType[];
  autoSlideInterval?: number;
};

const CarouselComponent = ({
  slides,
  autoSlideInterval = 3000,
}: CarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // const handlePrevious = useCallback(() => {
  //   setCurrentSlide((prevSlide) =>
  //     prevSlide === 0 ? slides.length - 1 : prevSlide - 1
  //   );
  // }, [slides.length]);

  const handleNext = useCallback(() => {
    setCurrentSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  }, [slides.length]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, autoSlideInterval);

    return () => clearInterval(intervalId);
  }, [handleNext, autoSlideInterval]);

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex h-96 transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="w-full flex-shrink-0 relative">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority={i === 0} // Load first image with higher priority
            />
            <div className="absolute inset-0 bg-gray-800/50 mix-blend-multiply" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              <h2 className="text-white text-5xl md:text-7xl font-black font-anton">
                {slide.title}
              </h2>
              <Link
                href={slide.link}
                className="mt-4 bg-background py-2 px-4 rounded-xl"
              >
                {slide.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="hidden absolute top-0 left-0 bottom-0 lg:flex items-center justify-center gap-5 py-4">
        <button
          onClick={handlePrevious}
          aria-label="Previous slide"
          className="bg-background rounded-full p-2 ml-3"
        >
          <ArrowLeftIcon />
        </button>
      </div>
      <div className="hidden absolute top-0 right-0 bottom-0 lg:flex items-center justify-center gap-5 py-4">
        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="bg-background rounded-full p-2 mr-3"
        >
          <ArrowRightIcon />
        </button>
      </div> */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-5 w-full py-4">
        {slides.map((_, i) => (
          <button
            onClick={() => setCurrentSlide(i)}
            key={`circle-${i}`}
            className={cn(
              "rounded-full h-5 w-5 bg-background",
              i === currentSlide && "bg-foreground"
            )}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export const Carousel = memo(CarouselComponent);
