import { PayCruiseBookingForm } from "@/components/_dashboard/_cruises-admin/_cruise-bookings/PayCruiseBookingForm";

type Params = Promise<{ updateCruiseBookingSlug: string }>;

export default async function PayCruisePage(props: { params: Params }) {
	const params = await props.params;

	const slug = params.updateCruiseBookingSlug

	return <><PayCruiseBookingForm cruiseBookingId={slug} /></>;
}
