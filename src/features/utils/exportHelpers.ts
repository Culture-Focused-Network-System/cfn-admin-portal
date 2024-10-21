export const arrayToCsv = (data: any[]): string => {
	const csvRows: string[] = [];

	const headers = Object.keys(data[0]);
	csvRows.push(headers.join(","));

	data.forEach((row) => {
		const values = headers.map((header) => row[header]);
		csvRows.push(values.join(","));
	});

	return csvRows.join("\n");
};

export const downloadCsv = (data: any[], fileName: string): void => {
	const csvContent = arrayToCsv(data);
	const blob = new Blob([csvContent], { type: "text/csv" });
	const url = window.URL.createObjectURL(blob);

	const link = document.createElement("a");
	link.href = url;
	link.download = `${fileName}.csv`;

	document.body.appendChild(link);
	link.click();

	document.body.removeChild(link);
};
