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
					await createGuest({ email, fullName });
				}

				return true;
			} catch (error) {
				console.log(error);
				return false;
			}
		},
		session: async ({ session }) => {
			const guest = await getGuest(session.user.email);

			session.user.guestId = guest.id;

			return session;
		},
	},
	pages: {
		signIn: "/login",
	},
});

export const config = {
	matcher: [],
};
