"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  adminNavApi,
  dashboardNavApiType,
  managerNavApi,
  userNavApi,
} from "./dashboard-nav-api";
import { Session } from "next-auth";
import { GaugeIcon, ShipIcon } from "lucide-react";
import { useState } from "react";
import { cruisesNavApi } from "./cruises-nav-api";

export function DesktopNav({ session }: { session: Session | null }) {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();
  const role = session?.user?.role;

  // Determine the appropriate navigation links based on user role
  const dashNavApi: dashboardNavApiType[] = (() => {
    switch (role) {
      case "ADMIN":
        return adminNavApi;
      case "MANAGER":
        return managerNavApi;
      case "USER":
        return userNavApi;
      default:
        return [];
    }
  })();

  const urlRole = role?.toLowerCase();

  // Render cruise links if `open` is true
  const cruisesLinks = open ? (
    <div
      className={cn(
        "flex flex-col gap-2 py-2 pl-8 bg-gray-400/15 dark:bg-gray-600/15 rounded-xl mt-4"
      )}
    >
      {cruisesNavApi.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          onClick={() => setOpen(!open)}
          className={cn(
            "hover:text-orangeElement transition-all ease-in-out duration-300 uppercase font-semibold",
            pathname === item.href && "text-orangeElement"
          )}
        >
          <span className="flex items-center gap-2 text-sm">{item.name}</span>
        </Link>
      ))}
    </div>
  ) : null;

  return (
    <>
      <aside
        className={cn(
          "hidden w-64 lg:flex flex-col bg-gray-400/15 dark:bg-gray-600/15 gap-4 p-3 rounded-xl"
        )}
      >
        <Link
          href={`/dashboard/${urlRole}`}
          className={cn(
            "hover:text-orangeElement transition-all ease-in-out duration-300 uppercase font-semibold",
            pathname === `/dashboard/${urlRole}` && "text-orangeElement"
          )}
        >
          <span className="flex items-center gap-2 text-sm">
            <GaugeIcon />
            <p className={cn("transition-all ease-in-out duration-300")}>
              Dashboard
            </p>
          </span>
        </Link>

        {role === "ADMIN" && (
          <div>
            <button
              className={cn(
                "hover:text-orangeElement transition-all ease-in-out duration-300 uppercase font-semibold",
                pathname === `/dashboard/${urlRole}/cruises-admin` &&
                  "text-orangeElement"
              )}
              onClick={() => {
                setOpen(!open);
              }}
            >
              <span className="flex items-center gap-2 text-sm">
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
            className={cn(
              "hover:text-highlightPath transition-all ease-in-out duration-300 uppercase font-semibold",
              pathname === item.href && "text-orangeElement"
            )}
          >
            <span className="flex items-center gap-2 text-sm">
              {item.icon}
              <p className={cn("transition-all ease-in-out duration-300")}>
                {item.name}
              </p>
            </span>
          </Link>
        ))}
      </aside>
    </>
  );
}
