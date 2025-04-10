import Match from '@/components/Match/Match';

import { fetchMatchPageData, fetchDotaConstants } from '@/utils/matches-page';
import { redirect } from 'next/navigation';

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
