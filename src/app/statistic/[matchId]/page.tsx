import Statistic from '@/components/Statistic/Statistic';

import { redirect } from 'next/navigation';
import { fetchDotaConstants, fetchMatchData } from '@/utils/statistic/match-data-utility';

export default async function StatisticPage({
  searchParams,
}: {
  searchParams: Promise<{ id: number }>;
}) {
  const { id } = await searchParams;

  if (!id) {
    redirect('/statistic');
  }

  const matchData = await fetchMatchData(id);
  const dotaConstantsData = await fetchDotaConstants();

  return <Statistic matchData={matchData} dotaConstantsData={dotaConstantsData} />;
}
