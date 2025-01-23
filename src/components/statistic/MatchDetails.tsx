import TableDetails from './tableDetails/TableDetails'
import ResultOfMatch from './ResultOfMatch'
import PicksBans from './PicksBans'
import TableAbilities from './tableAbilities/TableAbilities'
import MapAndGraph from './MapAndGraph'

import { MatchDetailsUtility } from '@/utils/statistic/MatchDetailsUtility'
import { useEffect, useState } from '@/shared/reactImports'
import { useAppDispatch, useAppSelector } from '@/shared/reduxImports'
import { setTableLoading } from '@/store/statisticSlice'

import type { PlayersByTeam } from '@/types/statistic/matchDetails'

import styles from '@/styles/statistic/MatchDetails.module.scss'

export default function MatchDetails() {
  const { matchDetails } = useAppSelector((store) => store.statisticSlice)
  const dispatch = useAppDispatch()

  const [playersByTeam, setPlayersByTeam] = useState<PlayersByTeam>()

  useEffect(() => {
    if (matchDetails) {
      const uMatchData = MatchDetailsUtility.getInstance()
      setPlayersByTeam(uMatchData.filterPlayersByTeam(matchDetails))
    }
  }, [matchDetails])

  if (!playersByTeam) {
    dispatch(setTableLoading(true))
    return
  } else {
    setTableLoading(false)
  }

  return (
    <div className={styles.match}>
      <div className={styles.match__header}>
        <ResultOfMatch />
      </div>
      <TableDetails playersTeam={playersByTeam?.playersRadiant} />
      <PicksBans side={'radiant'} />
      <TableDetails playersTeam={playersByTeam?.playersDire} />
      <PicksBans side={'dire'} />
      <TableAbilities playersTeam={playersByTeam?.playersRadiant} />
      <TableAbilities playersTeam={playersByTeam?.playersDire} />
      <MapAndGraph />
    </div>
  )
}
