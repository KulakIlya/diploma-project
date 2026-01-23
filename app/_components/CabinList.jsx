import { filterCabins } from "../_utils/filterCabins";
import { getCabins } from "../services/data-service";
import CabinCard from "./CabinCard";

const CabinList = async ({ filter }) => {
	const cabins = await getCabins();
	const filteredCabins = filterCabins(cabins, filter);

	if (!filteredCabins.length) return null;

	return (
		<div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
			{filteredCabins.map((cabin) => (
				<CabinCard cabin={cabin} key={cabin.id} />
			))}
		</div>
	);
};

export default CabinList;
