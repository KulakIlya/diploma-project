import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./app/services/data-service";

export const { handlers, auth, signIn, signOut } = NextAuth({
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
		}),
	],
	callbacks: {
		authorized: async ({ auth }) => {
			return !!auth;
		},
		signIn: async ({ user: { email, name: fullName } }) => {
			try {
				const existingGuest = await getGuest(email);

				if (!existingGuest) {
					console.log("Creating new guest for:", email);
					const newGuest = await createGuest({ email, fullName });
					if (!newGuest) {
						console.error("Failed to create guest");
						return false;
					}
				}

				return true;
			} catch (error) {
				console.error("Sign-in error:", error);
				return false;
			}
		},
		jwt: async ({ token, account }) => {
			if (account) {
				token.accessToken = account.access_token;
				token.idToken = account.id_token;
			}
			return token;
		},
		session: async ({ session, token }) => {
			try {
				const guest = await getGuest(session.user.email);

				if (!guest) {
					console.error("Guest not found for email:", session.user.email);
					throw new Error("Guest profile not found");
				}

				// MongoDB uses _id, the API should return either id or _id
				session.user.guestId = guest._id || guest.id;

				if (!session.user.guestId) {
					console.error("Guest ID not found in guest object:", guest);
					throw new Error("Guest ID not found");
				}

				session.accessToken = token.accessToken;
				session.idToken = token.idToken;

				return session;
			} catch (error) {
				console.error("Session callback error:", error);
				throw error;
			}
		},
	},
	pages: {
		signIn: "/login",
	},
});

export const config = {
	matcher: [],
};
