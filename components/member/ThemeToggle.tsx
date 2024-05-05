'use client';

import { Fragment, useEffect, useState } from 'react';
import Switch from '@components/ui/Switch';
import {
  getLocalStorage,
  LOCALSTORAGE_PREFIX,
  setLocalStorage,
} from '@lib/localStorage';

export const LOCALSTORAGE_THEME = `${LOCALSTORAGE_PREFIX}-theme`;

const themes = ['light', 'dark'] as const;

export type Themes = (typeof themes)[number];

export const handleStartTheme = () => {
  const savedTheme: Themes | null = getLocalStorage(LOCALSTORAGE_THEME);
  if (savedTheme) {
    document.querySelector('html')?.setAttribute('data-theme', savedTheme);
  }
};

interface Props {
  showLabel?: boolean;
}

export const useTheme = () => {
  const initialTheme = document.documentElement.getAttribute('data-theme');
  const [theme] = useState(initialTheme || 'light');

  return { theme };
};

const ThemeToggle = ({ showLabel }: Props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<Themes>('light');

  const handleStart = async () => {
    const savedTheme: Themes | null = await getLocalStorage(LOCALSTORAGE_THEME);
    if (savedTheme) {
      setCurrentTheme(savedTheme);
      setIsChecked(savedTheme === 'dark');
      document.querySelector('html')?.setAttribute('data-theme', savedTheme);
    }
  };

  useEffect(() => {
    handleStart();
  }, []);

  const handleThemeChange = () => {
    const theme = isChecked ? 'dark' : 'light';
    if (document?.querySelector('html')) {
      setCurrentTheme(() => theme);
      document.querySelector('html')?.setAttribute('data-theme', theme);
      setLocalStorage(LOCALSTORAGE_THEME, theme);
      setIsChecked(() => !isChecked);
    }
  };

  return (
    <Fragment>
      <div className="flex gap-2">
        {showLabel && (
          <div className="dynamic_text flex flex-none font-semibold">
            <div className="flex items-center">Tema</div>
          </div>
        )}
        <Switch
          preLabel="Lys"
          postLabel="Mørk"
          value={currentTheme === 'dark'}
          onChange={handleThemeChange}
        />
      </div>
    </Fragment>
  );
};

export default ThemeToggle;
