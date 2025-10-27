import { useEffect, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

/**
 * React custom hook
 *
 * Returns state of the mobile and desktop versions of a page
 *
 * During hydration applies correct MUI styles for a page
 *
 * @returns {{ mobile: boolean, desktop: boolean } | null}
 */
export function useMountedQuery() {
  const [isMounted, setIsMounted] = useState({ mobile: false, desktop: false });
  const theme = useTheme();

  // use noSsr option to prevent ssr issues
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    noSsr: true,
    defaultMatches: false, // safe default for ssr
  });

  // use useEffect instead of useLayoutEffect for ssr compatibility
  useEffect(() => {
    setIsMounted({ mobile: isMobile, desktop: !isMobile });
  }, [isMobile]);

  if (!isMounted.mobile && !isMounted.desktop) {
    return null;
  }

  return isMounted;
}
