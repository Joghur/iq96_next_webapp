'use client';

import {
  LOCALSTORAGE_PREFIX,
  getLocalStorage,
  setLocalStorage,
} from '@lib/localStorage';
import { useState, useEffect } from 'react';

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
    <div>
      <label htmlFor="themeSelector" className="dynamic_text">
        Vælg farve tema:
      </label>
      <select
        id="themeSelector"
        value={currentTheme}
        onChange={e => handleThemeChange(e.target.value as Themes)}
        className="select select-bordered sm:select-lg select-xs w-full max-w-xs ">
        {themes.map((o, index) => (
          <option value={o} key={index}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeSelector;
