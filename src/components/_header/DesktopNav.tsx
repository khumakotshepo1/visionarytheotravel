"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { mainNavApi } from "./main-nav-api";

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex gap-2">
      {mainNavApi.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            "hover:text-orangeElement transition-all ease-in-out duration-300 uppercase font-anton",
            pathname === item.href && "text-orangeElement"
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
