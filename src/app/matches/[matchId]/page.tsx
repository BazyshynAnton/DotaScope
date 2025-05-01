import Match from '@/components/Match/Match';

import { redirect } from 'next/navigation';
import { fetchMatchPageData, fetchDotaConstants } from '@/utils/matches-page';

export default async function MatchPage({
  searchParams,
}: {
  searchParams: Promise<{ id: number }>;
}) {
  const { id } = await searchParams;

  if (!id) {
    redirect('/matches');
  }

  const matchPageData = await fetchMatchPageData(id);
  const dotaConstants = await fetchDotaConstants();

  return <Match matchPageData={matchPageData} dotaConstants={dotaConstants} />;
}
