import {
  CreditCardIcon,
  GaugeIcon,
  MapPinHouseIcon,
  SettingsIcon,
  ShoppingBasketIcon,
  ShoppingCartIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";

export type dashboardNavApiType = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

export const adminNavApi: dashboardNavApiType[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <GaugeIcon />,
  },
  {
    name: "Orders",
    href: "/dashboard/admin/orders",
    icon: <ShoppingBasketIcon />,
  },
  {
    name: "Products",
    href: "/dashboard/admin/products",
    icon: <ShoppingCartIcon />,
  },
  {
    name: "Customers",
    href: "/dashboard/admin/customers",
    icon: <UserIcon />,
  },
  {
    name: "Users",
    href: "/dashboard/admin/users",
    icon: <UsersIcon />,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: <SettingsIcon />,
  },
];

export const managerNavApi: dashboardNavApiType[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <GaugeIcon />,
  },
  {
    name: "Orders",
    href: "/dashboard/manager/orders",
    icon: <ShoppingBasketIcon />,
  },
  {
    name: "Products",
    href: "/dashboard/manager/products",
    icon: <ShoppingCartIcon />,
  },
  {
    name: "Customers",
    href: "/dashboard/manager/customers",
    icon: <UserIcon />,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: <SettingsIcon />,
  },
];

export const userNavApi: dashboardNavApiType[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <GaugeIcon />,
  },
  {
    name: "Orders",
    href: "/dashboard/user/orders",
    icon: <ShoppingBasketIcon />,
  },

  {
    name: "Addresses",
    href: "/dashboard/user/addresses",
    icon: <MapPinHouseIcon />,
  },

  {
    name: "Payment Methods",
    href: "/dashboard/user/payment-methods",
    icon: <CreditCardIcon />,
  },

  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: <SettingsIcon />,
  },
];
