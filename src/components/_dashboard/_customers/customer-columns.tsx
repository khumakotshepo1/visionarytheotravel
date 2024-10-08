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

import { toast } from "sonner";
import { UpdateCustomerForm } from "./UpdateCustomerForm";
import { deleteCustomerAction } from "@/actions/customer.action";

export const customerColumns: ColumnDef<CustomerPropsType>[] = [
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "customer_email",
    header: "Email",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original;
      const customer_id = customer.customer_id;

      const processForm = async () => {
        const res = await deleteCustomerAction(customer_id);

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
              <UpdateCustomerForm customer={customer} />
            </span>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
