import { auth } from "@/auth";

import ReservationsList from "@/app/_components/ReservationsList";
import { getBookings } from "@/app/services/data-service";

export const metadata = {
	title: "Reservations",
};

export default async function Page() {
	const session = await auth();
	const bookings = await getBookings(session.user.guestId);

	return (
		<div>
			<h2 className="mb-7 text-2xl font-semibold text-accent-400">
				Your reservations
			</h2>

			<ReservationsList bookings={bookings} />
		</div>
	);
}
