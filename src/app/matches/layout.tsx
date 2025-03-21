import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DotaScope | Matches',
};

export default function MatchesPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
