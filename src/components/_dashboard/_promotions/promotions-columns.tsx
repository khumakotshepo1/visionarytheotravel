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
import Image from "next/image"

export const promotionsColumns: ColumnDef<PromotionsPropsType>[] = [
  {
    accessorKey: "promotion_image",
    header: "Promotion Image",
    cell: ({ row }) => {
      const promotion_image = row.getValue("promotion_image") as string;

      return (
        <Image
          src={promotion_image}
          alt="Ship image"
          width={100}
          height={100}
          className="w-20 h-20 object-cover"
        />
      );
    },
  },
  {
    accessorKey: "promotion_name",
    header: "Promotion Name",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const promotion = row.original;
      const promotion_id = promotion.promotion_id;

      const processForm = async () => {
        const res = await deleteCruiseAction(promotion_id);

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

            <Link href={`/dashboard/admin/promotions/${promotion_id}`} className="text-sm pl-2">
              update promotion
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
