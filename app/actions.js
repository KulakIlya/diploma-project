"use server";

import { auth, signIn, signOut } from "@/auth";
import {
	createBooking,
	deleteBooking,
	getBooking,
	updateBooking,
	updateGuest,
} from "./services/data-service";
import { NATIONALITY_ID_REGEX } from "./patterns";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const getSession = async () => {
	const session = await auth();

	if (!session) throw new Error("You must be logged in");

	return session;
};

// Helper to handle API errors and redirect on 401
const handleApiError = (error) => {
	if (error.statusCode === 401) {
		redirect("/login");
	}
	throw error;
};

export const login = async () => {
	await signIn("google", { redirectTo: "/", redirect: "/" });
};

export const logout = async () => {
	await signOut();
};

export const updateProfile = async (formData) => {
	const session = await getSession();

	const nationalID = formData.get("nationalID");
	const [nationality, countryFlag] = formData.get("nationality").split("%");

	// if (!NATIONALITY_ID_REGEX.test(nationalID))
	// 	throw new Error("Please provide a valid national ID");

	const updateData = { nationality, countryFlag, nationalID };

	try {
		await updateGuest(session.user.guestId, updateData, session.idToken);
	} catch (error) {
		handleApiError(error);
	}

	revalidatePath("/account/profile");
};

export const deleteReservation = async (id) => {
	const session = await getSession();

	try {
		const reservation = await getBooking(id, session.idToken);

		if (reservation.guest._id !== session.user.guestId) {
			throw new Error("Unauthorized");
		}

		await deleteBooking(id, session.idToken);
	} catch (error) {
		handleApiError(error);
	}

	revalidatePath("account/reservations");
};

export const updateReservation = async (id, formData) => {
	const session = await getSession();

	try {
		const reservation = await getBooking(id, session.idToken);
		console.log("session", session);
		console.log("reservation", reservation);
		if (reservation.guest._id !== session.user.guestId) {
			throw new Error("Unauthorized");
		}

		const updateData = {
			numGuests: formData.get("numGuests"),
			observations: formData.get("observations"),
		};

		await updateBooking(id, updateData, session.idToken);
	} catch (error) {
		handleApiError(error);
	}

	revalidatePath("/account/reservations");
};

export const createReservation = async (bookingData, formData) => {
	const session = await getSession();

	const newBooking = {
		...bookingData,
		guest: session.user.guestId,
		numGuests: Number(formData.get("numGuests")),
		observations: formData.get("observations").slice(0, 1000),
		extrasPrice: 0,
		totalPrice: bookingData.cabinPrice,
		isPaid: false,
		hasBreakfast: false,
		status: "unconfirmed",
	};

	try {
		await createBooking(newBooking, session.idToken);
	} catch (error) {
		handleApiError(error);
	}

	revalidatePath(`/rooms/${bookingData.cabinId}`);

	redirect("/rooms/thankyou");
};
