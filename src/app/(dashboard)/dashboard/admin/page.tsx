import { DashCruiseBookingsCard } from "@/components/_dashboard/DashCruiseBookingsCard";
// import { getAllCustomers } from "@/server/ customer.server";
import { getAllCruiseBookings, getPreviousCruiseTotalPrice } from "@/server/cruises.server";

export default async function AdminDashboardPage() {
  const cruiseBookings =
    (await getAllCruiseBookings()) as CruiseBookingPropsType[];

  const previousTotalPrice = await getPreviousCruiseTotalPrice();

  console.log({ previousTotalPrice })

  // const customers = (await getAllCustomers()) as CustomerPropsType[];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 place-items-center">
      <DashCruiseBookingsCard
        title="Cruise Bookings"
        link="/dashboard/admin/cruises-admin/cruise-bookings"
        data={cruiseBookings}
        prev_cruise_total_price={previousTotalPrice}
      />
    </section>
  );
}
