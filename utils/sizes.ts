'use client';

// Define the media query for the lg breakpoint in Tailwind
const smBreakpoint = window.matchMedia('(min-width: 640px)');

// Function to check if the screen size is lg
export function isMobile() {
  return !smBreakpoint.matches;
}
