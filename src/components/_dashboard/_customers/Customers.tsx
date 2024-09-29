import { customerColumns } from "./customer-columns";
import { getAllCustomers } from "@/server/ customer.server";
import { CustomerForm } from "./CustomerForm";
import { CustomersTable } from "./CustomersTable";

export async function Customers() {
  const customers = (await getAllCustomers()) as CustomerPropsType[];

  return (
    <>
      <section className="flex justify-end items-center p-4">
        <CustomerForm />
      </section>
      <section>
        <CustomersTable columns={customerColumns} data={customers} />
      </section>
    </>
  );
}
