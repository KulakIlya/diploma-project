"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { FILTER_OPTIONS } from "../_constants/cabins";
import clsx from "clsx";

const Filter = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const handleFilter = useCallback(
		(filter) => {
			const params = new URLSearchParams(searchParams);

			params.set("capacity", filter);
			router.replace(`${pathname}?${params}`, { scroll: false });
		},
		[pathname, router, searchParams],
	);

	const filterButtons = useMemo(
		() => [
			{
				id: FILTER_OPTIONS.ALL,
				label: "All cabins",
				onClick: () => handleFilter(FILTER_OPTIONS.ALL),
			},
			{
				id: FILTER_OPTIONS.SMALL,
				label: "1 - 3 guests",
				onClick: () => handleFilter(FILTER_OPTIONS.SMALL),
			},
			{
				id: FILTER_OPTIONS.MEDIUM,
				label: "4 - 7 guests",
				onClick: () => handleFilter(FILTER_OPTIONS.MEDIUM),
			},
			{
				id: FILTER_OPTIONS.LARGE,
				label: "8 - 12 guests",
				onClick: () => handleFilter(FILTER_OPTIONS.LARGE),
			},
		],
		[handleFilter],
	);

	return (
		<div className="flex border border-primary-800">
			{filterButtons.map(({ id, label, onClick }) => {
				return (
					<button
						key={id}
						className={clsx(
							"px-5 py-2 hover:bg-primary-700",
							searchParams.get("capacity") === id &&
								"bg-primary-700 text-primary-50",
						)}
						onClick={onClick}
					>
						{label}
					</button>
				);
			})}
		</div>
	);
};
export default Filter;
