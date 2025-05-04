import { useEffect, useState } from 'react';

export function useTailwindBreakpoint(
  breakpoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
) {
  const breakpoints: Record<string, string> = {
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
    '2xl': '(min-width: 1536px)',
  };

  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(breakpoints[breakpoint]).matches;
    }
    return false;
  });

  useEffect(() => {
    const media = window.matchMedia(breakpoints[breakpoint]);

    const listener = () => setMatches(media.matches);
    listener(); // Initial check
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [breakpoint]);

  return matches;
}
