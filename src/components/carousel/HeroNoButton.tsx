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
        </div>
      </div>
    </div>
  );
}
