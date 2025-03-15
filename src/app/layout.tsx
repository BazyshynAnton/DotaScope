import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TooltipPortal from '@/components/Portals_1/TooltipPortal';
import TooltipAbilityPortal from '@/components/Portals_1/TooltipAbilityPortal';
import StoreProvider from '@/store/StoreProvider';

import { Exo_2 } from 'next/font/google';

import type { Metadata } from 'next';

import '@/styles/globals.scss';
import EarlyAccess from '@/components/InDevelopment/EarlyAccess';

const exo2 = Exo_2({
  weight: ['400', '500', '700', '900'],
  style: ['normal'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DotaScope',
  icons: {
    apple: ['/favicon/apple-touch-icon.png?v=4'],
    icon: ['/favicon/favicon.ico?v=4'],
    shortcut: ['/favicon/apple-touch-icon.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={exo2.className}>
          <Header />
          <main className="wrapper">
            {children}
            <TooltipPortal />
            <TooltipAbilityPortal />
          </main>
          <Footer />
          <EarlyAccess /> {/* temporary */}
        </body>
      </html>
    </StoreProvider>
  );
}
