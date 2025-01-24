import { useAppSelector } from '@/hooks/useAppSelector'
import { MatchDetailsUtility } from '@/utils/statistic/MatchDetailsUtility'

import styles from '@/styles/statistic/MatchHeader.module.scss'

export default function MatchHeader() {
  const { matchDetails, region, gameMode, lobbyType, leagues } = useAppSelector(
    (store) => store.statisticSlice,
  )

  if (!matchDetails || !region || !gameMode || !lobbyType || !leagues) return

  const uMatchData = MatchDetailsUtility.getInstance()
  const mode = uMatchData.findGameMode(matchDetails, gameMode)
  const league = uMatchData.findLeague(matchDetails, leagues)

  return (
    <div className={styles.matchHeader}>
      {region[matchDetails.region] && <p>Region: {region[matchDetails.region]}</p>}
      {mode && <p>Game mode: {mode}</p>}
      {league && <p>League: {league}</p>}
      {matchDetails.match_id && <p>Match ID: {matchDetails.match_id}</p>}
    </div>
  )
}
