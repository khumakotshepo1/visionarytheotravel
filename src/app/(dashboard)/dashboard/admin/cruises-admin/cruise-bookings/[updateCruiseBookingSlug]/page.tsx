import { UpdateCruiseBookingForm } from "@/components/_dashboard/_cruises-admin/_cruise-bookings/UpdateCruiseBookingForm";
import {
  getAllCustomers,
  getCruiseBookingByBookingNumber,
} from "@/server/customer.server";
import { getAllCruises } from "@/server/cruises.server";

type Params = Promise<{ updateCruiseBookingSlug: string }>;

export default async function UpdateCruiseBookingSlug(props: { params: Params }) {
  const params = await props.params;
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
