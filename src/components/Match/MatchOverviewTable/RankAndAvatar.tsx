import { Image } from '@/shared/nextjs-imports';

import type { PlayerDetails } from '@/types/match-overview-player-row';

import styles from '@/styles/match-overview-table-content.module.scss';

export default function RankAndAvatar({ playerDetails }: { playerDetails: PlayerDetails }) {
  const rankIcon = playerDetails.profileInfo.rankIcon;
  console.log(rankIcon);
  const profilePicture = playerDetails.profileInfo.profilePicture;
  const rankTier = playerDetails.leaderboardRankInfo;

  return (
    <div className={styles.playerRow__rankAndAvatar}>
      <div className={styles.rank}>
        <Image src={rankIcon} alt={'Rank'} width={40} height={40} />
        {playerDetails.leaderboardRankInfo !== null && (
          <div className={styles.rank__tier}>{rankTier}</div>
        )}
      </div>
      <div className={styles.avatar}>
        <Image src={profilePicture} alt={'Avatar'} width={24} height={24} />
      </div>
    </div>
  );
}
