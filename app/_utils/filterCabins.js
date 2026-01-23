import {
	FILTER_OPTIONS,
	MEDIUM_CABIN_CAPACITY,
	SMALL_CABIN_CAPACITY,
} from "../_constants/cabins";

const predicateMap = {
	[FILTER_OPTIONS.SMALL]: ({ maxCapacity }) => {
		return maxCapacity <= SMALL_CABIN_CAPACITY;
	},
	[FILTER_OPTIONS.MEDIUM]: ({ maxCapacity }) => {
		return (
			maxCapacity > SMALL_CABIN_CAPACITY && maxCapacity < MEDIUM_CABIN_CAPACITY
		);
	},
	[FILTER_OPTIONS.LARGE]: ({ maxCapacity }) => {
		return maxCapacity >= MEDIUM_CABIN_CAPACITY;
	},
};

export const filterCabins = (cabins, filterOption) => {
	const predicate = predicateMap[filterOption];

	if (filterOption === FILTER_OPTIONS.ALL || !predicate) return cabins;

	return cabins.filter(predicate);
};
