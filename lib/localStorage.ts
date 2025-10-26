"use client";

export const LOCALSTORAGE_PREFIX = "iq96nextwebapp";

export const getLocalStorage = <T>(key: string) => {
	const res = localStorage.getItem(key);

	try {
		if (res) {
			return JSON.parse(res) as T;
		}
	} catch (error) {
		console.error("Local Storage error");
	}
	return null;
};

export const setLocalStorage = <T>(key: string, obj: T) => {
	if (key) {
		localStorage.setItem(key, JSON.stringify(obj));
		return obj;
	}
	return null;
};
