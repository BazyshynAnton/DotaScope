import Statistic from '@/components/statistic/Statistic'

import { fetchDotaConstants, fetchMatchData } from '@/utils/statistic/MatchDataUtility'

export default async function StatisticPage() {
  const matchData = await fetchMatchData()
  const dotaConstantsData = await fetchDotaConstants()

  return <Statistic matchData={matchData} dotaConstantsData={dotaConstantsData} />
}
