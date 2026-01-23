export const truncate = (value, limit) => {
	const splitByWordsValue = value.split(" ");
	return splitByWordsValue.length > limit
		? splitByWordsValue.slice(0, limit).join(" ") + "..."
		: value;
};
