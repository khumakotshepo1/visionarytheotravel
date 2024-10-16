import {
  CreditCardIcon,
  MapPinHouseIcon,
  MegaphoneIcon,
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
    name: "Merch",
    href: "/dashboard/admin/merch-admin",
    icon: <ShoppingCartIcon />,
  },
  {
    name: "Promotions",
    href: "/dashboard/admin/promotions",
    icon: <MegaphoneIcon />,
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

export const userNavApi: dashboardNavApiType[] = [
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
