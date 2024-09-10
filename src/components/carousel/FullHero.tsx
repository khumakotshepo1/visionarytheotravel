import Image from "next/image";
import Link from "next/link";

export type heroFullType = {
  title: string;
  image: string;
  link: string;
  cta: string;
};

export function FullHero({ title, image, link, cta }: heroFullType) {
  return (
    <div className="relative overflow-hidden">
      <div className="flex h-96 transition-transform duration-500 ease-out">
        <div className="w-full flex-shrink-0 relative">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gray-800/50 mix-blend-multiply" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <h2 className="text-white text-5xl md:text-7xl font-black font-anton">
              {title}
            </h2>
            <Link
              href={link}
              className="mt-4 bg-background py-2 px-4 rounded-xl"
            >
              {cta}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
