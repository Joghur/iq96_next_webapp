import moment from "moment";
import "moment/locale/da";

export const epochToDate = (epoch: number | undefined) => {
	if (!epoch || epoch === 0) return "na";

	return new Date(epoch)
		.toISOString() //yyyy-mm-ddThh:mm:ss.000Z format
		.replace(/T.+Z$/, ""); // removes everything between T and Z
};

export const convertEpochSecondsToDateString = (
	epochSeconds: number,
	format = "D/MMMM-YYYY HH:mm",
) => {
	moment.locale("da");
	return moment(epochSeconds * 1000).format(format);
};

export const fromNow = (epochSeconds: number) => {
	return moment(epochSeconds * 1000).fromNow();
};

export const dayDiff = (epochSeconds: number) => {
	const epoch = epochSeconds * 1000;
	return moment(epoch).diff(moment(new Date()), "days");
};

export const convertMonthNumberToName = (monthNumber?: number) => {
	if (!monthNumber || monthNumber < 1 || monthNumber > 12) {
		return undefined;
	}

	const months = [
		"januar",
		"februar",
		"marts",
		"april",
		"maj",
		"juni",
		"juli",
		"august",
		"september",
		"oktober",
		"november",
		"december",
	];

	return months[monthNumber - 1];
};
