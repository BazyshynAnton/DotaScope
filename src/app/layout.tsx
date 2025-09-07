import GlobalThemeProvider from '@/providers/GlobalThemeProvider';
// import Header from '@/components/ui/Header/Header';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DotaScope',
  description: 'Dota 2 Data Platform',
  // icons: {}
};

/**
 * React component
 *
 * Implementation of the "root" layout
 * includes NextAuth SessionProvider for authentication
 *
 * @param {ReactNode} children React node
 * @returns {JSX.Element}
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <GlobalThemeProvider>{children}</GlobalThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
