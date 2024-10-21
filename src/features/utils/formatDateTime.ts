export const formatDateTime = (isoDate?: string): string => {
	if (!isoDate) return "N/A";

	const date = new Date(isoDate);

	const formatNumber = (num: number): string =>
		num < 10 ? `0${num}` : `${num}`;

	const day = formatNumber(date.getDate());
	const month = formatNumber(date.getMonth() + 1);
	const year = date.getFullYear();

	let hours = date.getHours();
	const minutes = formatNumber(date.getMinutes());

	const ampm = hours >= 12 ? "pm" : "am";
	hours = hours % 12 || 12;

	return `${month}/${day}/${year} ${hours}:${minutes}${ampm}`;
};
