import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AnchorIcon,
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "lucide-react";

export default function CruiseBooking({
  cruise_booking,
}: {
  cruise_booking: CruiseBookingPropsType;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>View Booking</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-anton">
            Booking Number: {cruise_booking?.cruise_booking_number}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-8 border-b-4 border-orangeElement">
          <h2 className="text-xl font-bold underline">Customer details</h2>
          <div className="grid gap-4">
            <h4 className="font-semibold text-sm capitalize">
              {cruise_booking?.first_name} {cruise_booking?.last_name}
            </h4>

            <div className="flex gap-4 items-center text-xs p-3 bg-gray-400/15 dark:bg-gray-600/15 rounded-xl">
              <p className="flex gap-2 items-center">
                <MailIcon className="h-4 w-4" />{" "}
                {cruise_booking?.customer_email}
              </p>
              <p className="flex gap-2 items-center">
                <PhoneIcon className="h-4 w-4" /> {cruise_booking?.phone_number}
              </p>
            </div>
          </div>
        </div>
        <div className="grid gap-4 py-8 border-b-4 border-orangeElement">
          <h2 className="text-xl font-bold underline">Booking details</h2>
          <div className="grid gap-4">
            <h4 className="font-semibold text-sm capitalize">
              {cruise_booking?.cruise_name}
            </h4>

            <div className="grid gap-4 text-xs p-3 bg-gray-400/15 dark:bg-gray-600/15 rounded-xl">
              <span className="flex gap-2 items-center border-b-2 border-foreground p-3">
                <p className="flex gap-2 items-center">
                  Embarkation: {cruise_booking?.embarkation_date.toDateString()}
                </p>
                <p className="flex gap-2 items-center">
                  Disembarkation:{" "}
                  {cruise_booking?.disembarkation_date.toDateString()}
                </p>
              </span>
              <span className="flex gap-2 items-center border-b-2 border-foreground p-3">
                <p className="flex gap-2 items-center">
                  <MapPinIcon className="h-4 w-4 text-orangeElement" />{" "}
                  {cruise_booking?.cruise_destination}
                </p>
                <p className="flex gap-2 items-center">
                  <AnchorIcon className="h-4 w-4 text-orangeElement" />{" "}
                  {cruise_booking?.departure_port}
                </p>
                <p className="flex gap-2 items-center">
                  <ClockIcon className="h-4 w-4 text-orangeElement" />{" "}
                  {cruise_booking?.duration} Nights
                </p>
              </span>
              <span className="flex gap-2 items-center border-b-2 border-foreground p-3">
                <p>Adults: {cruise_booking?.cruise_number_of_adults}</p>
                <p>Kids: {cruise_booking?.cruise_number_of_kids}</p>
              </span>
            </div>
            <div className="flex gap-4 items-center text-xs p-3 bg-gray-400/15 dark:bg-gray-600/15 rounded-xl">
              <p className="font-semibold text-lg p-3">
                Price: R{cruise_booking?.cruise_price}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
