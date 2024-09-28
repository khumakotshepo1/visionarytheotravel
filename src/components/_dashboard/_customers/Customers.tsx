import { DataTable } from "@/components/DataTable";
import { customerColumns } from "./customer-columns";
import { getAllCustomers } from "@/server/ customer.server";
import { CustomerForm } from "./CustomerForm";

export async function Customers() {
  const customers = (await getAllCustomers()) as CustomerPropsType[];

  return (
    <>
      <section className="flex justify-end items-center p-4">
        <CustomerForm />
      </section>
      <section>
        <DataTable columns={customerColumns} data={customers} />
      </section>
    </>
  );
}
