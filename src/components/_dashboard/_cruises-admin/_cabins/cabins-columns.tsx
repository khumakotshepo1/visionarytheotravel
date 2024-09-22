"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { UpdateCabinForm } from "./UpdateCabinForm";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

type CabinPropsType = {
  name: string;
  ship: string;
  image: string;
  cabin_id: string;
};

export const cabinColumns: ColumnDef<CabinPropsType>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const image = row.getValue("image") as string;

      return (
        <Image
          src={image}
          alt="Cabin image"
          width={100}
          height={100}
          className="w-20 h-20 object-cover"
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "ship",
    header: "Ship",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const cabin = row.original;

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

            <Link
              href={`/dashboard/admin/cruises-admin/ships/${cabin.name}/cabins`}
            >
              <DropdownMenuItem>View Cabins</DropdownMenuItem>
            </Link>

            <span className="text-sm pl-2">
              <UpdateCabinForm cabin={cabin} />
            </span>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
