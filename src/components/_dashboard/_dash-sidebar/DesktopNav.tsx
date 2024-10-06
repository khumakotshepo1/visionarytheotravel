"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  adminNavApi,
  dashboardNavApiType,
  userNavApi,
} from "./dashboard-nav-api";
import { Session } from "next-auth";
import { GaugeIcon, PackageIcon, ShipIcon } from "lucide-react";
import { useState } from "react";
import { cruisesNavApi } from "./cruises-nav-api";
import { packagesNavApi } from "./packages-nav-api";

export function DesktopNav({ session }: { session: Session | null }) {
  const [openCruisesMenu, setOpenCruisesMenu] = useState(false);
  const [openPackagesMenu, setOpenPackagesMenu] = useState(false);

  const pathname = usePathname();
  const role = session?.user?.role;

  // Determine the appropriate navigation links based on user role
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

  // Render cruise links if `openCruisesMenu` is true
  const cruisesLinks = openCruisesMenu ? (
    <div
      className={cn(
        "flex flex-col gap-2 py-2 pl-8 bg-gray-400/15 dark:bg-gray-600/15 rounded-xl mt-4"
      )}
    >
      {cruisesNavApi.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          onClick={() => setOpenCruisesMenu(!openCruisesMenu)}
          className={cn(
            "hover:text-crimsonElement transition-all ease-in-out duration-300 uppercase font-semibold",
            pathname === item.href && "text-crimsonElement"
          )}
        >
          <span className="flex items-center gap-2 text-sm">{item.name}</span>
        </Link>
      ))}
    </div>
  ) : null;

  const packagesLinks = openPackagesMenu ? (
    <div
      className={cn(
        "flex flex-col gap-2 py-2 pl-8 bg-gray-400/15 dark:bg-gray-600/15 rounded-xl mt-4"
      )}
    >
      {packagesNavApi.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          onClick={() => setOpenPackagesMenu(!openPackagesMenu)}
          className={cn(
            "hover:text-crimsonElement transition-all ease-in-out duration-300 uppercase font-semibold",
            pathname === item.href && "text-crimsonElement"
          )}
        >
          <span className="flex items-center gap-2 text-sm">{item.name}</span>
        </Link>
      ))}
    </div>
  ) : null;

  return (
    <aside
      className={cn(
        "hidden w-64 lg:flex flex-col bg-gray-400/15 dark:bg-gray-600/15 gap-4 p-3 rounded-xl"
      )}
    >
      <Link
        href={`/dashboard/${urlRole}`}
        className={cn(
          "hover:text-crimsonElement transition-all ease-in-out duration-300 uppercase font-semibold",
          pathname === `/dashboard/${urlRole}` && "text-crimsonElement"
        )}
      >
        <span className="flex items-center gap-2 text-sm">
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
              "hover:text-crimsonElement transition-all ease-in-out duration-300 uppercase font-semibold",
              pathname === `/dashboard/${urlRole}/cruises-admin` &&
              "text-crimsonElement"
            )}
            onClick={() => setOpenCruisesMenu(!openCruisesMenu)}
            aria-label="Toggle Cruises Menu"
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

      {(role === "ADMIN" || role === "MANAGER") && (
        <div>
          <button
            className={cn(
              "hover:text-crimsonElement transition-all ease-in-out duration-300 uppercase font-semibold",
              pathname === `/dashboard/${urlRole}/packages-admin` &&
              "text-crimsonElement"
            )}
            onClick={() => setOpenPackagesMenu(!openPackagesMenu)}
            aria-label="Toggle Packages Menu"
          >
            <span className="flex items-center gap-2 text-sm">
              <PackageIcon />
              <p className={cn("transition-all ease-in-out duration-300")}>
                Packages
              </p>
            </span>
          </button>
          {packagesLinks}
        </div>
      )}

      {dashNavApi.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            "hover:text-highlightPath transition-all ease-in-out duration-300 uppercase font-semibold",
            pathname === item.href && "text-crimsonElement"
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
  );
}
