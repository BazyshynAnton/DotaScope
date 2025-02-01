import { Link } from '@/shared/nextjsImports'
import { useAppDispatch } from '@/shared/reduxImports'
import { setIsTableDataExist, setMatchData, setTableLoading } from '@/store/statisticSlice'
import { fetchMatchData } from '@/utils/statistic/matchDataUtility'
import { timeAgo } from '@/utils/sharedUtils'

import type { ProMatch } from '@/types/home/homeData'

import styles from '@/styles/home/Home.module.scss'

export default function ProMatchCard({ proMatch }: { proMatch: ProMatch }) {
  const dispatch = useAppDispatch()

  const endTime = proMatch.start_time + proMatch.duration
  const now = Math.floor(Date.now() / 1000)
  const diffInSeconds = now - endTime
  const matchDurationMinutes = Math.floor(proMatch.duration / 60)
  const matchDurationSeconds = proMatch.duration % 60

  const handleOverviewClick = async () => {
    dispatch(setIsTableDataExist(true))
    const mID = proMatch.match_id
    const matchData = await fetchMatchData(mID)
    dispatch(setMatchData(matchData))
  }

  let formattedLeagueName =
    proMatch.league_name.length > 25
      ? proMatch.league_name.substring(0, 24) + '...'
      : proMatch.league_name
  const radiantName = proMatch.radiant_name ? proMatch.radiant_name : 'TBD'
  const direName = proMatch.dire_name ? proMatch.dire_name : 'TBD'

  return (
    <div className={styles.proMatchCard}>
      <div className={styles.proMatch__nameAndTeams}>
        <h4>{formattedLeagueName}</h4>
        <div className={styles.teams}>
          <div>
            <span style={{ color: '#59ce8f' }}>Radiant: </span>
            <span>{radiantName}</span>
          </div>
          <div>
            <span style={{ color: '#df2e38' }}>Dire: </span>
            <span>{direName}</span>
          </div>
        </div>
      </div>
      <div className={styles.proMatch__info}>
        <p>ID: {proMatch.match_id}</p>
        <p>
          Duration: {`${matchDurationMinutes}:${matchDurationSeconds.toString().padStart(2, '0')}`}
        </p>
        <p>{timeAgo(diffInSeconds)}</p>
        <Link href={'/statistic'} onClick={handleOverviewClick}>
          overview
        </Link>
      </div>
    </div>
  )
}
