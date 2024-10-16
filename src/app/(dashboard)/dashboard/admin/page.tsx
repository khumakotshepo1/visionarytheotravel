import { DashBookedCustomersCard } from "@/components/_dashboard/DashBookedCustomersCard";
import { DashCruiseBookingsCard } from "@/components/_dashboard/DashCruiseBookingsCard";
import { getAllCruiseBookings, getPreviousCruiseTotalPrice } from "@/server/cruises.server";
import { getAllCustomers } from "@/server/customer.server";

export default async function AdminDashboardPage() {
  const cruiseBookings =
    (await getAllCruiseBookings()) as CruiseBookingPropsType[];

  const previousTotalPrice = await getPreviousCruiseTotalPrice() as PreviousCruiseTotalPricePropsType[];

  console.log({ previousTotalPrice })

  const customers = (await getAllCustomers()) as CustomerPropsType[];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 place-items-center">
      <DashCruiseBookingsCard
        title="Cruise Bookings"
        link="/dashboard/admin/cruises-admin/cruise-bookings"
        data={cruiseBookings}
        prev_cruise_total_price={previousTotalPrice}
      />
      <DashBookedCustomersCard
        title="Booked Customers"
        link="/dashboard/admin/customers"
        data={customers}
      />
    </section>
  );
}
