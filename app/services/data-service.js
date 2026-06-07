import { eachDayOfInterval } from "date-fns";
import { apiCall, authApiCall } from "./api-config";
import { notFound } from "next/navigation";

// GET

export async function getCabin(id) {
	try {
		const data = await apiCall(`/rooms/${id}`);
		return data;
	} catch (error) {
		console.error(error);
		notFound();
	}
}

export async function getCabinPrice(id) {
	try {
		const data = await apiCall(`/rooms/${id}/price`);
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export const getCabins = async function () {
	try {
		const data = await apiCall(`/rooms`);
		return data;
	} catch (error) {
		console.error(error);
		throw new Error("Cabins could not be loaded");
	}
};

// Guests are uniquely identified by their email address
export async function getGuest(email, token) {
	try {
		// If no token provided, use public endpoint
		const endpoint = `/guests/email/${email}`;
		const data = token
			? await authApiCall(endpoint, {}, token)
			: await apiCall(endpoint);
		return data;
	} catch (error) {
		// No error here! We handle the possibility of no guest in the sign in callback
		if (error.statusCode !== 404) {
			console.error(error);
		}
		return null;
	}
}

export async function getBooking(id, token) {
	try {
		const data = await authApiCall(`/bookings/${id}`, {}, token);
		return data;
	} catch (error) {
		console.error(error);
		throw new Error("Booking could not get loaded");
	}
}

export async function getBookings(guestId, token) {
	try {
		const data = await authApiCall(`/bookings/me`, {}, token);
		return data;
	} catch (error) {
		console.error(error);
		throw new Error("Bookings could not get loaded");
	}
}

export async function getBookedDatesByCabinId(cabinId, token) {
	try {
		if (!token) {
			return;
		}

		let today = new Date();
		today.setUTCHours(0, 0, 0, 0);
		today = today.toISOString();

		// Getting all bookings
		const data = await authApiCall(
			`/bookings/booked-dates/${cabinId}`,
			{},
			token,
		);

		// Converting to actual dates to be displayed in the date picker
		const bookedDates = data.bookedDates
			.map((booking) => {
				return eachDayOfInterval({
					start: new Date(booking.startDate),
					end: new Date(booking.endDate),
				});
			})
			.flat();

		return bookedDates;
	} catch (error) {
		console.error(error);
		throw new Error("Bookings could not get loaded");
	}
}

export async function getSettings() {
	try {
		const data = await apiCall(`/settings`);
		return data;
	} catch (error) {
		console.error(error);
		throw new Error("Settings could not be loaded");
	}
}

export async function getCountries() {
	try {
		const res = await fetch(
			"https://restcountries.com/v2/all?fields=name,flag",
		);
		const countries = await res.json();
		return countries;
	} catch {
		throw new Error("Could not fetch countries");
	}
}

/////////////
// CREATE

export async function createGuest(newGuest, token) {
	try {
		// If no token provided, use public endpoint (for sign-up flow)
		const endpoint = `/guests`;
		const data = token
			? await authApiCall(
					endpoint,
					{ method: "POST", body: JSON.stringify(newGuest) },
					token,
				)
			: await apiCall(endpoint, {
					method: "POST",
					body: JSON.stringify(newGuest),
				});
		return data;
	} catch (error) {
		console.error(error);
		throw new Error("Guest could not be created");
	}
}

export async function createBooking(newBooking, token) {
	try {
		const data = await authApiCall(
			`/bookings`,
			{ method: "POST", body: JSON.stringify(newBooking) },
			token,
		);
		return data;
	} catch (error) {
		console.error(error);
		throw new Error("Booking could not be created");
	}
}

/////////////
// UPDATE

// The updatedFields is an object which should ONLY contain the updated data
export async function updateGuest(id, updatedFields, token) {
	try {
		const data = await authApiCall(
			`/guests/${id}`,
			{ method: "PATCH", body: JSON.stringify(updatedFields) },
			token,
		);
		return data;
	} catch (error) {
		console.error(error);
		throw new Error("Guest could not be updated");
	}
}

export async function updateBooking(id, updatedFields, token) {
	try {
		const data = await authApiCall(
			`/bookings/${id}`,
			{ method: "PATCH", body: JSON.stringify(updatedFields) },
			token,
		);
		return data;
	} catch (error) {
		console.error(error);
		throw new Error("Booking could not be updated");
	}
}

/////////////
// DELETE

export async function deleteBooking(id, token) {
	try {
		await authApiCall(`/bookings/${id}`, { method: "DELETE" }, token);
		return null;
	} catch (error) {
		console.error(error);
		throw new Error("Booking could not be deleted");
	}
}
