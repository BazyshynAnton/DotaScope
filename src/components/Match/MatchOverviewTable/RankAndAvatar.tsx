import { Image } from '@/shared/nextjs-imports';

import type { PlayerDetails } from '@/types/match-overview-player-row';

import styles from '@/styles/match-overview-table-content.module.scss';

export default function RankAndAvatar({ playerDetails }: { playerDetails: PlayerDetails }) {
  const rankIcon = playerDetails.profileInfo.rankIcon;
  const profilePicture = playerDetails.profileInfo.profilePicture;
  const rankTier = playerDetails.leaderboardRankInfo;

  return (
    <div className={styles.rankAndAvatar}>
      <div className={styles.rank}>
        <Image src={rankIcon} alt={'Rank'} width={100} height={100} />
        {rankTier !== null && <div className={styles.tier}>{rankTier}</div>}
      </div>
      <div className={styles.avatar}>
        <Image src={profilePicture} alt={'Avatar'} width={100} height={100} />
      </div>
    </div>
  );
}
