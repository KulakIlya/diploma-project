"use client";

import { useState } from "react";
import { truncate } from "../_utils/truncate";
import Logo from "./Logo";

const TRUNCATE_LIMIT = 40;

function TextExpander({ children }) {
	const [isExpanded, setIsExpanded] = useState(false);
	const displayText = isExpanded
		? children
		: truncate(children, TRUNCATE_LIMIT);

	const isTruncatable = children.split(" ").length > TRUNCATE_LIMIT;

	return (
		<span>
			{displayText}{" "}
			{isTruncatable && (
				<button
					className="border-b border-primary-700 pb-1 leading-3 text-primary-700"
					onClick={() => setIsExpanded(!isExpanded)}
				>
					{isExpanded ? "Show less" : "Show more"}
				</button>
			)}
		</span>
	);
}

export default TextExpander;
