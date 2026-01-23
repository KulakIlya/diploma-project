import { auth } from "@/auth";
import { getBookedDatesByCabinId, getSettings } from "../services/data-service";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

const Reservation = async ({ cabin }) => {
	const [settings, bookedDates] = await Promise.all([
		getSettings(),
		getBookedDatesByCabinId(cabin.id),
	]);

	const session = await auth();

	return (
		<div className="grid min-h-[400px] grid-cols-2 border border-primary-800">
			<DateSelector
				settings={settings}
				cabin={cabin}
				bookedDates={bookedDates}
			/>
			{session?.user ? (
				<ReservationForm cabin={cabin} user={session.user} />
			) : (
				<LoginMessage />
			)}
		</div>
	);
};
export default Reservation;
