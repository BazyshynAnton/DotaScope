'use client';

import CssBaseline from '@mui/material/CssBaseline';

import { ThemeProvider } from '@mui/material';
import { globalTheme } from '@/styles/global-theme';

/**
 * React component
 *
 * MUI theme provider
 *
 * @param {ReactNode} children React node
 * @returns {JSX.Element}
 */
export default function GlobalThemeProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={globalTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
