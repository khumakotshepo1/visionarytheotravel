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
import { UpdateCabinForm } from "./UpdateCabinForm";
import { deleteCabinAction } from "@/actions/cruise.actions";
import { toast } from "sonner";

export const cabinColumns: ColumnDef<CabinPropsType>[] = [
  {
    accessorKey: "cabin_image",
    header: "Cabin Image",
    cell: ({ row }) => {
      const cabin_image = row.getValue("cabin_image") as string;

      return (
        <Image
          src={cabin_image}
          alt="Cabin image"
          width={100}
          height={100}
          className="w-20 h-20 object-cover"
        />
      );
    },
  },
  {
    accessorKey: "cabin_name",
    header: "Cabin Name",
  },
  {
    accessorKey: "ship",
    header: "Ship",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const cabin = row.original;
      const cabin_id = cabin.cabin_id;

      const processForm = async () => {
        const res = await deleteCabinAction(cabin_id);

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
              <UpdateCabinForm cabin={cabin} />
            </span>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
