"use client";

import Switch from "@components/Switch";
import {
	getLocalStorage,
	LOCALSTORAGE_PREFIX,
	setLocalStorage,
} from "@lib/localStorage";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const LOCALSTORAGE_THEME = `${LOCALSTORAGE_PREFIX}-theme`;

const themes = ["light", "dark"] as const;

export type Themes = (typeof themes)[number];

export const handleStartTheme = () => {
	const savedTheme: Themes | null = getLocalStorage(LOCALSTORAGE_THEME);
	if (savedTheme) {
		document.querySelector("html")?.setAttribute("data-theme", savedTheme);
	}
};

interface Props {
	showLabel?: boolean;
}

const ThemeToggle = ({ showLabel }: Props) => {
	const { setTheme } = useTheme();
	const [isChecked, setIsChecked] = useState(false);
	const [currentTheme, setCurrentTheme] = useState<Themes>("light");

	console.log("currentTheme", currentTheme);
	console.log("isChecked", isChecked);

	const handleStart = async () => {
		const savedTheme: Themes | null = await getLocalStorage(LOCALSTORAGE_THEME);
		if (savedTheme) {
			setCurrentTheme(savedTheme);
			setIsChecked(savedTheme === "dark");
			setTheme(savedTheme);
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <handleStart changes often>
	useEffect(() => {
		handleStart();
	}, []);

	const handleThemeChange = () => {
		const toggled = !isChecked ? "light" : "dark";
		setCurrentTheme(() => toggled);
		setTheme(toggled);
		setLocalStorage(LOCALSTORAGE_THEME, toggled);
	};

	return (
		<div className="flex gap-2">
			{showLabel && (
				<div className="dynamic_text flex flex-none font-semibold">
					<div className="flex items-center">Tema</div>
				</div>
			)}
			<Switch
				preLabel="Lys"
				postLabel="Mørk"
				value={currentTheme === "dark"}
				onChange={handleThemeChange}
			/>
		</div>
	);
};

export default ThemeToggle;
