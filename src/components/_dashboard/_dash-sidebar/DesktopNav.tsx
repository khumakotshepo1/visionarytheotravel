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

export function DesktopNav({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const role = session?.user?.role;

  let dashNavApi: dashboardNavApiType[] = [];

  role === "ADMIN" && (dashNavApi = adminNavApi);
  role === "MANAGER" && (dashNavApi = managerNavApi);
  role === "USER" && (dashNavApi = userNavApi);

  return (
    <aside className="hidden w-80 md:flex flex-col bg-gray-400/10 dark:bg-gray-600/10 gap-8 p-3 rounded-xl">
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
            {item.name}
          </span>
        </Link>
      ))}
    </aside>
  );
}
