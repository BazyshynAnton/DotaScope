import { useAppSelector } from '@/hooks/useAppSelector'
import { MatchDetailsUtility } from '@/utils/statistic/MatchDetailsUtility'
import { timeAgo } from '@/utils/sharedUtils'
import { ReactTooltip } from '@/shared/reactImports'

import { IoMdDownload } from 'react-icons/io'
import { IoMdWarning } from 'react-icons/io'

import styles from '@/styles/statistic/MatchHeader.module.scss'

export default function MatchHeader() {
  const { matchDetails, region, gameMode, lobbyType, leagues } = useAppSelector(
    (store) => store.statisticSlice,
  )

  if (!matchDetails || !region || !gameMode || !lobbyType || !leagues) return

  const uMatchData = MatchDetailsUtility.getInstance()
  const mode = uMatchData.findGameMode(matchDetails, gameMode)
  const league = uMatchData.findLeague(matchDetails, leagues)
  const reg = uMatchData.findRegion(matchDetails, region)
  const replay = matchDetails.replay_url ? matchDetails.replay_url : ''

  // time
  const duration = `${Math.floor(matchDetails.duration / 60)}:${(matchDetails.duration % 60).toString().padStart(2, '0')}`
  const endTime = matchDetails.start_time + matchDetails.duration
  const currentTime = Math.floor(Date.now() / 1000)
  const diffInSeconds = currentTime - endTime

  return (
    <div className={styles.matchHeader}>
      <div className={styles.matchHeader__title}>
        {matchDetails.match_id && (
          <div>
            <p>Match ID: {matchDetails.match_id}</p>
            <button className={replay ? styles.btnAvailable : styles.btnWarning}>
              {replay ? (
                <>
                  <IoMdDownload />
                  <a href={replay} target='_blank'>
                    replay
                  </a>
                </>
              ) : (
                <>
                  <IoMdWarning />
                  <p data-tooltip-id='warning'>replay</p>
                  <ReactTooltip
                    id='warning'
                    place='right'
                    content='Replay is not available'
                    style={{
                      textTransform: 'none',
                      fontWeight: 'bold',
                      color: '#ffab40',
                      background: '#533814',
                    }}
                  />
                </>
              )}
            </button>
          </div>
        )}
      </div>
      <div className={styles.matchHeader__info}>
        {mode && (
          <div>
            <p>{mode}</p>
            <span>game mode</span>
          </div>
        )}
        {league && (
          <div>
            <p>{league}</p>
            <span>league</span>
          </div>
        )}
        {reg && (
          <div>
            <p>{reg}</p>
            <span>region</span>
          </div>
        )}
        {duration && (
          <div>
            <p>{duration}</p>
            <span>duration</span>
          </div>
        )}
        {diffInSeconds && (
          <div>
            <p>{timeAgo(diffInSeconds)}</p>
            <span>match ended</span>
          </div>
        )}
      </div>
    </div>
  )
}
