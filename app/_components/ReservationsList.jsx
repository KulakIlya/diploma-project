"use client";

import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteReservation } from "../actions";

const ReservationsList = ({ bookings }) => {
	const [optimisticDelete, setOptimisticDelete] = useOptimistic(
		bookings,
		(state, itemToDelete) => {
			return state.filter(({ id }) => itemToDelete !== id);
		},
	);

	const handleDelete = async (bookingId) => {
		setOptimisticDelete(bookingId);

		await deleteReservation(bookingId);
	};
	return (
		<>
			{optimisticDelete.length === 0 ? (
				<p className="text-lg">
					You have no reservations yet. Check out our{" "}
					<a className="text-accent-500 underline" href="/cabins">
						luxury cabins &rarr;
					</a>
				</p>
			) : (
				<ul className="space-y-6">
					{optimisticDelete.map((booking) => (
						<ReservationCard
							booking={booking}
							key={booking.id}
							onDelete={handleDelete}
						/>
					))}
				</ul>
			)}
		</>
	);
};
export default ReservationsList;
