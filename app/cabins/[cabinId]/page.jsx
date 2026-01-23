import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/services/data-service";
import { Suspense } from "react";

export const generateMetadata = async ({ params: { cabinId } }) => {
	const { name } = await getCabin(cabinId);

	return {
		title: `Cabin ${name}`,
	};
};

export const generateStaticParams = async () => {
	const cabins = await getCabins();

	return cabins.map(({ id }) => ({
		cabinId: String(id),
	}));
};

export default async function Page({ params }) {
	const { cabinId } = await params;

	const cabin = await getCabin(cabinId);

	return (
		<div className="mx-auto mt-8 max-w-6xl">
			<Cabin cabin={cabin} />
			<div>
				<h2 className="mb-10 text-center text-5xl font-semibold text-accent-400">
					Reserve {cabin.name} today. Pay on arrival.
				</h2>

				<Suspense fallback={<Spinner />}>
					<Reservation cabin={cabin} />
				</Suspense>
			</div>
		</div>
	);
}
