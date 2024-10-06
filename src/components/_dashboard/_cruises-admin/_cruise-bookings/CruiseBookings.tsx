import { cruiseBookingColumns } from "./cruise-booking-columns";
import { CruiseBookingsTable } from "./CruiseBookingsTable";
import { getAllCruiseBookings } from "@/server/cruises.server";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export async function CruiseBookings() {
  const cruise_bookings =
    (await getAllCruiseBookings()) as CruiseBookingPropsType[];

  return (
    <>
      <section className="flex justify-end items-center p-4">
        <Link href="/dashboard/admin/cruises-admin/cruise-bookings/add-booking">
          <Button
            variant="outline"
            className="bg-crimsonElement dark:bg-crimsonElement text-lightElement dark:text-lightElement"
          >
            Add Cruise Booking
          </Button>
        </Link>
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
