import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
	subsets: ["latin"],
	display: "swap",
});

import Header from "./_components/Header";
import { ReservationProvider } from "./_contexts/ReservationContext";

import "./globals.css";

export const metadata = {
	title: {
		template: "%s / The Wild Oasis",
		default: "Welcome / The Wild Oasis",
	},
	description:
		"Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${josefin.className} relative min-h-screen flex-col bg-primary-950 text-primary-100 antialiased`}
			>
				<Header />
				<div className="flex-1 px-8 py-12">
					<main className="mx-auto w-full max-w-7xl">
						<ReservationProvider>{children}</ReservationProvider>
					</main>
				</div>
			</body>
		</html>
	);
}
