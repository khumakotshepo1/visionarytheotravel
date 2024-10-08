"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { toast } from "sonner";

import CruiseBooking from "./CruiseBooking";
import Link from "next/link";
import { deleteCruiseBookingAction } from "@/actions/cruise.actions";

export const cruiseBookingColumns: ColumnDef<CruiseBookingPropsType>[] = [
  {
    accessorKey: "cruise_booking_number",
    header: "Booking Number",
  },
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "cruise_balance_due",
    header: "Balance Due",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const booking = row.original;
      const cruise_booking_number = booking.cruise_booking_number;

      const processForm = async () => {
        const res = await deleteCruiseBookingAction(cruise_booking_number);

        if (res?.error) {
          toast.error(res.error);
        }

        if (res?.success) {
          toast.success(res.success);
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="flex flex-col gap-3 py-4 px-8">

            <form action={processForm}>
              <button className="text-sm">Delete</button>
            </form>

            <span className="text-sm">
              <CruiseBooking cruise_booking={booking} />
            </span>

            <Link
              href={`/dashboard/admin/cruises-admin/cruise-bookings/${cruise_booking_number}`}
              className="text-sm"
            >
              Edit Booking
            </Link>


            <Link
              href={`/dashboard/admin/cruises-admin/cruise-bookings/${cruise_booking_number}/pay-cruise`}
              className="text-sm"
            >
              Pay Booking
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
