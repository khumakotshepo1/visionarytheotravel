"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";

import { deleteShipAction } from "@/actions/cruise.actions";
import { toast } from "sonner";

export const cruiseItineraryColumns: ColumnDef<CruiseItineraryPropsType>[] = [
  {
    accessorKey: "map",
    header: "Map",
    cell: ({ row }) => {
      const map = row.getValue("map") as string;

      return (
        <Image
          src={map}
          alt="Map image"
          width={100}
          height={100}
          className="w-20 h-20 object-cover"
        />
      );
    },
  },

  {
    accessorKey: "day",
    header: "Day",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "arrive",
    header: "Arrive",
  },
  {
    accessorKey: "depart",
    header: "Depart",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const cruiseItinerary = row.original;

      const cruise_itinerary_id = cruiseItinerary.cruise_itinerary_id;

      const processForm = async () => {
        const res = await deleteShipAction(cruise_itinerary_id);

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
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <form action={processForm}>
              <button className="text-sm pl-2">Delete</button>
            </form>

            <span className="text-sm pl-2">
              {/* <UpdateShipForm cruiseItinerary={cruiseItinerary} /> */}
            </span>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
