import { CruiseBookingForm } from "@/components/_dashboard/_cruises-admin/_cruise-bookings/CruiseBookingForm";
import { getAllCustomers } from "@/server/customer.server";
import { getAllCruises } from "@/server/cruises.server";

export default async function AddBookingPage() {
  const cruises = (await getAllCruises()) as CruisePropsType[];
  const customers = (await getAllCustomers()) as CustomerPropsType[];

  return (
    <>
      <CruiseBookingForm cruises={cruises} customers={customers} />
    </>
  );
}
