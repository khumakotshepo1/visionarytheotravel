import { UpdateCruiseBookingForm } from "@/components/_dashboard/_cruises-admin/_cruise-bookings/UpdateCruiseBookingForm";
import {
  getAllCustomers,
  getCruiseBookingByBookingNumber,
} from "@/server/ customer.server";
import { getAllCruises } from "@/server/cruises.server";

export default async function UpdateCruiseBookingSlug({
  params,
}: {
  params: { updateCruiseBookingSlug: string };
}) {
  const cruiseBookingID = parseInt(params.updateCruiseBookingSlug);

  console.log({ cruiseBookingID });

  const cruiseBooking = (await getCruiseBookingByBookingNumber(
    cruiseBookingID
  )) as CruiseBookingPropsType;

  console.log({ cruiseBooking });
  const cruises = (await getAllCruises()) as CruisePropsType[];
  const customers = (await getAllCustomers()) as CustomerPropsType[];

  return (
    <>
      <UpdateCruiseBookingForm
        cruiseBooking={cruiseBooking}
        cruises={cruises}
        customers={customers}
      />
    </>
  );
}
