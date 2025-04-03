import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DotaScope | Match search',
};

export default function MatchSearchPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
