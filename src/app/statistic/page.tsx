import Statistic from '@/components/Statistic/Statistic';

import { fetchDotaConstants, fetchMatchData } from '@/utils/statistic/match-data-utility';

export default async function StatisticPage() {
  const matchData = await fetchMatchData();
  const dotaConstantsData = await fetchDotaConstants();

  return <Statistic matchData={matchData} dotaConstantsData={dotaConstantsData} />;
}
