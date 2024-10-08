import { PayCruiseBookingForm } from "@/components/_dashboard/_cruises-admin/_cruise-bookings/PayCruiseBookingForm";

export default function PayCruisePage({ params }: { params: { updateCruiseBookingSlug: string } }) {

	const slug = params.updateCruiseBookingSlug

	return <><PayCruiseBookingForm cruiseBookingId={slug} /></>;
}
