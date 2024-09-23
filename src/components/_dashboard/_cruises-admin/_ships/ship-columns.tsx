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
import { UpdateShipForm } from "./UpdateShipForm";

export const shipColumns: ColumnDef<ShipPropsType>[] = [
  {
    accessorKey: "ship_image",
    header: "Ship Image",
    cell: ({ row }) => {
      const ship_image = row.getValue("ship_image") as string;

      return (
        <Image
          src={ship_image}
          alt="Ship image"
          width={100}
          height={100}
          className="w-20 h-20 object-cover"
        />
      );
    },
  },
  {
    accessorKey: "ship_name",
    header: "Ship Name",
  },
  {
    accessorKey: "ship_class",
    header: "Ship Class",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const ship = row.original;

      const ship_id = ship.ship_id;

      const processForm = async () => {
        const res = await deleteShipAction(ship_id);

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
              <UpdateShipForm ship={ship} />
            </span>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
