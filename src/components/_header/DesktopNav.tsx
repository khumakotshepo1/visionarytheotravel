"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { mainNavApi } from "./main-nav-api";

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex gap-2">
      {mainNavApi.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            "hover:text-crimsonElement transition-all ease-in-out duration-300 capitalize text-sm font-bold",
            pathname === item.href && "text-crimsonElement"
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
