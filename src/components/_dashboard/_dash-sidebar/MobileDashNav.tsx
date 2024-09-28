"use client";

import { cn } from "@/lib/utils";
import { GaugeIcon, ShipIcon } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

import {
  adminNavApi,
  dashboardNavApiType,
  userNavApi,
} from "./dashboard-nav-api";

import { cruisesNavApi } from "./cruises-nav-api";

export default function MobileDashNav({
  session,
  isOpen,
  setIsOpen,
}: {
  session: Session | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [openDash, setOpenDash] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const role = session?.user?.role;

  const dashNavApi: dashboardNavApiType[] = (() => {
    switch (role) {
      case "ADMIN":
      case "MANAGER":
        return adminNavApi;
      case "USER":
        return userNavApi;
      default:
        return [];
    }
  })();

  const urlRole = role === "MANAGER" ? "admin" : role?.toLowerCase();

  const cruisesLinks = open ? (
    <div className={cn("flex flex-col gap-2 py-2 pl-8 pr-36 bg-gray-400/15 dark:bg-gray-600/15 rounded-xl mt-4")}>
      {cruisesNavApi.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "hover:text-highlightPath transition-all ease-in-out duration-300 uppercase font-semibold",
            pathname === item.href && "text-orangeElement"
          )}
        >
          <span className="flex items-center gap-2 text-xl">{item.name}</span>
        </Link>
      ))}
    </div>
  ) : null;

  const dashMenu = openDash ? (
    <nav className="fixed inset-0 z-50 flex flex-col bg-background">
      <button
        className="w-full py-4 font-anton text-3xl tracking-wide bg-orangeElement text-lightElement"
        onClick={() => setOpenDash(!openDash)}
      >
        main menu
      </button>
      <div className="flex flex-col gap-4 p-4 mt-12 ml-10 items-start">
        <Link
          href={`/dashboard/${urlRole}`}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "text-xl tracking-wide",
            pathname === `/dashboard/${urlRole}` && "text-orangeElement"
          )}
        >
          <span className="flex items-center gap-2 font-bold">
            <GaugeIcon />
            <p className={cn("transition-all ease-in-out duration-300")}>
              Dashboard
            </p>
          </span>
        </Link>

        {(role === "ADMIN" || role === "MANAGER") && (
          <div>
            <button
              className={cn(
                "text-xl tracking-wide font-bold",
                pathname === `/dashboard/${urlRole}/cruises-admin` && "text-orangeElement"
              )}
              onClick={() => setOpen(!open)}
            >
              <span className="flex items-center gap-2">
                <ShipIcon />
                <p className={cn("transition-all ease-in-out duration-300")}>
                  Cruises
                </p>
              </span>
            </button>
            {cruisesLinks}
          </div>
        )}

        {dashNavApi.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "text-xl tracking-wide font-bold",
              pathname === item.href && "text-orangeElement"
            )}
          >
            <span className="flex items-center gap-2">
              {item.icon}
              <p className={cn("transition-all ease-in-out duration-300")}>
                {item.name}
              </p>
            </span>
          </Link>
        ))}
      </div>
    </nav>
  ) : null;

  return (
    <>
      <button
        className="font-anton text-3xl tracking-wide animate-pulse"
        onClick={() => setOpenDash(!openDash)}
      >
        Open Dashboard
      </button>
      {dashMenu}
    </>
  );
}

