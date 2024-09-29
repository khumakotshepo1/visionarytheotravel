export type PackageNavApiType = {
  name: string;
  href: string;
};

export const packagesNavApi: PackageNavApiType[] = [
  {
    name: "Accommodations",
    href: "/dashboard/admin/packages-admin/accommodations",
  },
  {
    name: "Transportation",
    href: "/dashboard/admin/packages-admin/transportation",
  },
  {
    name: "Package Itinerary",
    href: "/dashboard/admin/packages-admin/package-itinerary",
  },
  {
    name: "Excusions",
    href: "/dashboard/admin/packages-admin/excursions",
  },
  {
    name: "Manage Packages",
    href: "/dashboard/admin/packages-admin/manage-packages",
  },
];
