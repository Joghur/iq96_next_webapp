"use client";

import { Fragment, useEffect, useState } from "react";
import Switch from "@components/ui/Switch";
import {
  getLocalStorage,
  LOCALSTORAGE_PREFIX,
  setLocalStorage,
} from "@lib/localStorage";

export const LOCALSTORAGE_THEME = `${LOCALSTORAGE_PREFIX}-theme`;

const themes = ["light", "dark"] as const;

export type Themes = (typeof themes)[number];

const ThemeSelector = () => {
  const [isChecked, setIsChecked] = useState(false);
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

  const handleThemeChange = () => {
    if (document?.querySelector("html")) {
      setCurrentTheme(() => (isChecked ? "dark" : "light"));
      document
        .querySelector("html")
        ?.setAttribute("data-theme", isChecked ? "dark" : "light");
      setLocalStorage(LOCALSTORAGE_THEME, currentTheme);
      setIsChecked(() => !isChecked);
    }
  };

  return (
    <Fragment>
      <div className="dynamic_text flex flex-none font-semibold">
        <div className="flex items-center gap-1">Farve tema</div>
      </div>
      <Switch
        preLabel="Lys"
        postLabel="Mørk"
        value={currentTheme === "dark"}
        onChange={handleThemeChange}
      />
    </Fragment>
  );
};

export default ThemeSelector;
