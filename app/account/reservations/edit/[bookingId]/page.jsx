import UpdateBookingForm from "@/app/_components/UpdateBookingForm";

import { getBooking } from "@/app/services/data-service";
import { auth } from "@/auth";

export default async function Page({ params: { bookingId } }) {
	const session = await auth();
	const { numGuests, observations } = await getBooking(
		bookingId,
		session.idToken,
	);

	return (
		<div>
			<h2 className="mb-7 text-2xl font-semibold text-accent-400">
				Edit Reservation #{bookingId}
			</h2>
			<UpdateBookingForm
				numGuests={numGuests}
				bookingId={bookingId}
				observations={observations}
			/>
		</div>
	);
}
