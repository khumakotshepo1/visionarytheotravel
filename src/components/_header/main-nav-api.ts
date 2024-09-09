type MainNavApiType = {
  name: string;
  href: string;
};

export const mainNavApi: MainNavApiType[] = [
  { name: "Home", href: "/" },
  {
    name: "Cruises",
    href: "/cruises",
  },
  {
    name: "Packages",
    href: "/packages",
  },
  {
    name: "Merch",
    href: "/merch",
  },
];
