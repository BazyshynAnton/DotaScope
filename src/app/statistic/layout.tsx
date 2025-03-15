import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DotaScope | Statistic',
};

export default function StatisticLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
