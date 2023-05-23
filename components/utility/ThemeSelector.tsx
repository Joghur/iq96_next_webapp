'use client';

import {Themes} from '@lib/constants';
import {
  LOCALSTORAGE_PREFIX,
  getLocalStorage,
  setLocalStorage,
} from '@lib/localStorage';
import {useState, useEffect} from 'react';

export const LOCALSTORAGE_THEME = `${LOCALSTORAGE_PREFIX}-theme`;

const ThemeSelector = () => {
  const [currentTheme, setCurrentTheme] = useState<Themes>('light');

  useEffect(() => {
    const savedTheme: Themes | null = getLocalStorage(LOCALSTORAGE_THEME);
    if (savedTheme) {
      setCurrentTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    }
  }, []);

  useEffect(() => {}, [currentTheme]);

  const handleThemeChange = (theme: Themes) => {
    if (document?.querySelector('html')) {
      setCurrentTheme(theme);
      document.querySelector('html')?.setAttribute('data-theme', theme);
      setLocalStorage(LOCALSTORAGE_THEME, theme);
    }
  };

  return (
    <div>
      <label htmlFor="themeSelector">Vælg farve tema:</label>
      <select
        id="themeSelector"
        value={currentTheme}
        onChange={e => handleThemeChange(e.target.value as Themes)}
        className="p-2 m-2">
        <option value="dark">Mørkt</option>
        <option value="light">Lyst</option>
      </select>
    </div>
  );
};

export default ThemeSelector;
