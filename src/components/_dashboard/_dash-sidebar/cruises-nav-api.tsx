export type CruiseNavApiType = {
  name: string;
  href: string;
};

export const cruisesNavApi: CruiseNavApiType[] = [
  {
    name: "Ships",
    href: "/dashboard/admin/cruises-admin/ships",
  },
  {
    name: "Itinerary",
    href: "/dashboard/admin/cruises-admin/itinerary",
  },
  {
    name: "Manage Cruises",
    href: "/dashboard/admin/cruises-admin/manage-cruises",
  },
];
