import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DotaScope | Meta',
};

export default function MetaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
