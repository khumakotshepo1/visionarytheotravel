import Image from "next/image";
import Link from "next/link";

export function HeaderLogo() {
  return (
    <>
      <Link href="/">
        <span className="flex items-center gap-2">
          <Image
            className="block dark:hidden w-24 h-auto"
            src="/logos/visionarytheo-logo-black.webp"
            alt="logo"
            width={144}
            height={90}
            sizes={`(max-width: 768px) 96px, 144px`}
            priority
          />
          <Image
            className="dark:block hidden w-24 h-auto"
            src="/logos/visionarytheo-logo.webp"
            alt="logo"
            width={144}
            height={90}
            sizes={`(max-width: 768px) 96px, 144px`}
            priority
          />

          <h1 className="hidden md:block text-crimsonElement dark:text-foreground font-semibold text-4xl font-anton">
            travel
          </h1>
        </span>
      </Link>
    </>
  );
}
