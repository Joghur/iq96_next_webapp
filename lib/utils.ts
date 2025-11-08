/** biome-ignore-all lint/suspicious/noExplicitAny: <TODO> */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const capitalizeFirstLetter = (str: string) =>
	str.charAt(0).toUpperCase() + str.slice(1);

/**
 *
 * @param label Prettify labels
 * 2023-edinbourgh -> 2023 - Edinbourgh
 */
export const prettyImageFolderLabel = (label: string) => {
	if (label.includes("-")) {
		// Image label folder has this syntax 2023-edinbourgh
		const labelParts = label.split("-");
		return `${labelParts[0]} - ${capitalizeFirstLetter(labelParts[1])}`;
	}
	return label;
};

/**
 * Not all labels will be pulled from params and they're in english. So this wil be a short translater
 * as this will never change
 */
export const convertLabels = (label: string) => {
	switch (label) {
		case "gf":
			return "Generalforsamling";

		case "events":
			return "Stævner";

		default:
			return "Tour";
	}
};

/**
 * Converting one instance of urlsafe to normal text
 */
export const convertFromUrlSafe = (label: string) => {
	const newLabel = label;
	return decodeURIComponent(newLabel);
};

interface SortConfig<T> {
	property: keyof T;
	order: "asc" | "desc";
}

export function sortObjectArray<T>(arr: T[], config: SortConfig<T>): T[] {
	return arr.slice().sort((a, b) => {
		const valueA = a[config.property];
		const valueB = b[config.property];

		if (config.order === "desc") {
			if (valueA > valueB) return -1;
			if (valueA < valueB) return 1;
		} else {
			if (valueA < valueB) return -1;
			if (valueA > valueB) return 1;
		}

		return 0;
	});
}

export const isHorizontal = () => {
	const isHorizontal = window.innerWidth > window.innerHeight;

	return isHorizontal;
};

export const confirmAction = async (message: string): Promise<boolean> => {
	return window.confirm(message);
};

// TODO fix any
export function compareNick(a: any, b: any) {
	if (a.nick < b.nick) {
		return -1;
	}
	if (a.nick > b.nick) {
		return 1;
	}
	return 0;
}
