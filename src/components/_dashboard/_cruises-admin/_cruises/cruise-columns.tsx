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

import { deleteCruiseAction } from "@/actions/cruise.actions";
import { toast } from "sonner";
import Link from "next/link";

export const cruiseColumns: ColumnDef<CruisePropsType>[] = [
  {
    accessorKey: "cruise_name",
    header: "Cruise Name",
  },
  {
    accessorKey: "departure_port",
    header: "Departure Port",
  },
  {
    accessorKey: "embarkation_date",
    header: "Embarkation Date",
  },
  {
    accessorKey: "disembarkation_date",
    header: "Disembarkation Date",
  },
  {
    accessorKey: "duration",
    header: "Duration",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const cruise = row.original;
      const cruise_id = cruise.cruise_id;

      const processForm = async () => {
        const res = await deleteCruiseAction(cruise_id);

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

            <Link href={`/dashboard/admin/cruises-admin/manage-cruises/${cruise.cruise_date_id}`} className="text-sm pl-2">
              update cruise
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
