import { Image } from '@/shared/nextjs-imports';
import { PlayerRowDetailsUtility } from '@/utils/statistic/player-row-details-utility';

import type { PlayerDetails } from '@/types/statistic/player-row';

import styles from '@/styles/statistic/player-row.module.scss';

export default function RankAndAvatar({
  playerDetails,
  uRowDetails,
}: {
  playerDetails: PlayerDetails;
  uRowDetails: PlayerRowDetailsUtility;
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
  );
}
