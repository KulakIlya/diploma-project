import { useContext } from "react";
import { ReservationContext } from "../_contexts/ReservationContext";

export const useReservationContext = () => {
	const context = useContext(ReservationContext);

	if (!context) {
		throw new Error("useReservationContext is not defined");
	}

	return context;
};
