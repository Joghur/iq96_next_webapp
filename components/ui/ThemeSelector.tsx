"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getLocalStorage,
  LOCALSTORAGE_PREFIX,
  setLocalStorage,
} from "@lib/localStorage";

export const LOCALSTORAGE_THEME = `${LOCALSTORAGE_PREFIX}-theme`;

const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
] as const;

export type Themes = (typeof themes)[number];

const ThemeSelector = () => {
  const [currentTheme, setCurrentTheme] = useState<Themes>("light");

  const handleStart = async () => {
    const savedTheme: Themes | null = await getLocalStorage(LOCALSTORAGE_THEME);
    if (savedTheme) {
      setCurrentTheme(savedTheme);
      document.querySelector("html")?.setAttribute("data-theme", savedTheme);
    }
  };

  useEffect(() => {
    handleStart();
  }, []);

  const handleThemeChange = (theme: Themes) => {
    if (document?.querySelector("html")) {
      setCurrentTheme(theme);
      document.querySelector("html")?.setAttribute("data-theme", theme);
      setLocalStorage(LOCALSTORAGE_THEME, theme);
    }
  };

  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-center sm:gap-2">
      <div>
        <p className="dynamic_text flex flex-none">Farve tema:</p>
      </div>
      <Select
        value={currentTheme}
        onValueChange={(e) => handleThemeChange(e as Themes)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={currentTheme} />
        </SelectTrigger>
        <SelectContent className="bg-gray-50">
          {themes.map((o, index) => (
            <SelectItem value={o} key={index}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ThemeSelector;
