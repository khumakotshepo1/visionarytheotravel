import { CruiseBookingForm } from "./CruiseBookingForm";

import { cruiseBookingColumns } from "./cruise-booking-columns";
import { CruiseBookingsTable } from "./CruiseBookingsTable";
import { getAllCruiseBookings, getAllCruises } from "@/server/cruises.server";
import { getAllCustomers } from "@/server/ customer.server";

export async function CruiseBookings() {
  const cruise_bookings =
    (await getAllCruiseBookings()) as CruiseBookingPropsType[];

  const cruises = (await getAllCruises()) as CruisePropsType[];
  const customers = (await getAllCustomers()) as CustomerPropsType[];

  return (
    <>
      <section className="flex justify-end items-center p-4">
        <CruiseBookingForm cruises={cruises} customers={customers} />
      </section>
      <section>
        <CruiseBookingsTable
          columns={cruiseBookingColumns}
          data={cruise_bookings}
        />
      </section>
    </>
  );
}
