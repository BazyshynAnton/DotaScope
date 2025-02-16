import { Image } from '@/shared/nextjsImports'
import { PlayerRowDetailsUtility } from '@/utils/statistic/PlayerRowDetailsUtility'

import type { PlayerDetails } from '@/types/statistic/playerRow'

import styles from '@/styles/statistic/PlayerRow.module.scss'

export default function RankAndAvatar({
  playerDetails,
  uRowDetails,
}: {
  playerDetails: PlayerDetails
  uRowDetails: PlayerRowDetailsUtility
}) {
  return (
    <div className={styles.rankAndAvatar}>
      <div className={styles.rankAndAvatar__rank}>
        <Image
          src={uRowDetails.findPlayerRankIcon()}
          alt={"Player's Rank"}
          width={40}
          height={40}
          quality={100}
        />
        {playerDetails.leaderboardRankInfo !== null && (
          <div className={styles.rankAndAvatar__rank__tier}>
            {playerDetails.leaderboardRankInfo}
          </div>
        )}
      </div>
      <div className={styles.rankAndAvatar__avatar}>
        <Image
          src={uRowDetails.findPlayerAvatar()}
          alt={"Player's Avatar"}
          width={24}
          height={24}
          quality={100}
          unoptimized
        />
      </div>
    </div>
  )
}
