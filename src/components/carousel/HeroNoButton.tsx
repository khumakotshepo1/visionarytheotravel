import Image from "next/image";

export type heroNoButtonType = {
  title: string;
  image: string;
};

export function HeroNoButton({ title, image }: heroNoButtonType) {
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
          </div>
        </div>
      </div>
    </div>
  );
}
