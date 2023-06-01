'use client';

import { useEffect, useState } from 'react';
import {
  getLocalStorage,
  LOCALSTORAGE_PREFIX,
  setLocalStorage,
} from '@lib/localStorage';

export const LOCALSTORAGE_THEME = `${LOCALSTORAGE_PREFIX}-theme`;

const themes = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter',
] as const;

export type Themes = (typeof themes)[number];

const ThemeSelector = () => {
  const [currentTheme, setCurrentTheme] = useState<Themes>('light');

  const handleStart = async () => {
    const savedTheme: Themes | null = await getLocalStorage(LOCALSTORAGE_THEME);
    if (savedTheme) {
      setCurrentTheme(savedTheme);
      document.querySelector('html')?.setAttribute('data-theme', savedTheme);
    }
  };

  useEffect(() => {
    handleStart();
  }, []);

  const handleThemeChange = (theme: Themes) => {
    if (document?.querySelector('html')) {
      setCurrentTheme(theme);
      document.querySelector('html')?.setAttribute('data-theme', theme);
      setLocalStorage(LOCALSTORAGE_THEME, theme);
    }
  };

  return (
    <div className="flex sm:flex-row sm:justify-center sm:item-center sm:gap-2">
      <div>
        <label htmlFor="themeSelector" className="dynamic_text flex flex-none">
          Farve tema:
        </label>
      </div>
      <div>
        <select
          id="themeSelector"
          value={currentTheme}
          onChange={e => handleThemeChange(e.target.value as Themes)}
          className="select select-bordered sm:select-sm select-sm w-full max-w-xs ">
          {themes.map((o, index) => (
            <option value={o} key={index}>
              {o}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ThemeSelector;
