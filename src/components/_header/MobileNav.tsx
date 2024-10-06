"use client";

import Link from "next/link";

import { MenuIcon, X } from "lucide-react";
import { useState } from "react";
import { mainNavApi } from "./main-nav-api";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import MobileDashNav from "../_dashboard/_dash-sidebar/MobileDashNav";
import { Session } from "next-auth";

export default function MobileNav({ session }: { session: Session | null }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const pathname = usePathname();

  let menu;

  if (isOpen) {
    menu = (
      <div className="fixed inset-0 z-50 flex flex-col bg-background">
        <X
          className="h-6 w-6 absolute right-4 top-10"
          onClick={() => setIsOpen(!isOpen)}
        />
        <div className="flex flex-col gap-4 p-4 mt-36 ml-10 items-start">
          {mainNavApi.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "text-xl tracking-wide font-bold",
                pathname === item.href && "text-crimsonElement"
              )}
            >
              {item.name}
            </Link>
          ))}
          {session && (
            <MobileDashNav
              session={session}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <nav className="md:hidden">
      <div
        className="md:hidden cursor-pointer sticky bottom-0 left-0 right-0 z-50 py-6 rounded-xl flex items-center justify-center gap-2 bg-background backdrop:blur-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MenuIcon className="h-8 w-8" />
      </div>
      {menu}
    </nav>
  );
}
