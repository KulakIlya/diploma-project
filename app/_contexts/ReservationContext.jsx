"use client";

import { createContext, useState } from "react";

export const ReservationContext = createContext();

const initialValue = { from: null, to: null };

export const ReservationProvider = ({ children }) => {
	const [range, setRange] = useState(initialValue);

	const resetRange = () => {
		setRange(initialValue);
	};
	return (
		<ReservationContext.Provider value={{ range, setRange, resetRange }}>
			{children}
		</ReservationContext.Provider>
	);
};
