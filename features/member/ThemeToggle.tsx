"use client";

import { Switch } from "@components/Switch";
import { Label } from "@components/ui/label";
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

interface Props {
	showLabel?: boolean;
}

const ThemeToggle = ({ showLabel }: Props) => {
	const { theme, setTheme } = useTheme();
	const [isChecked, setIsChecked] = useState(false);

	useEffect(() => {
		const savedTheme = getLocalStorage(LOCALSTORAGE_THEME) as Themes | null;
		if (savedTheme) {
			setIsChecked(savedTheme === "dark");
			setTheme(savedTheme);
		} else {
			setIsChecked(theme === "dark");
		}
	}, [theme, setTheme]);

	const handleThemeChange = (checked: boolean) => {
		const newTheme = checked ? "dark" : "light";
		setIsChecked(checked);
		setTheme(newTheme); // Dette gemmer cookie, som opfanges i layout.tsx ved opstart
		setLocalStorage(LOCALSTORAGE_THEME, newTheme);
	};

	return (
		<div className="flex gap-2">
			{showLabel && (
				<div className="dynamic_text flex flex-none font-semibold">
					<div className="flex items-center">Tema</div>
				</div>
			)}
			<Switch
				id="theme-mode"
				checked={isChecked}
				onCheckedChange={handleThemeChange}
			/>
			<Label htmlFor="theme-mode">Dark Mode</Label>
		</div>
	);
};

export default ThemeToggle;
