import HeroAndNickname from './HeroAndNickname';
import RankAndAvatar from './RankAndAvatar';

import styles from '@/styles/match-overview-table-content.module.scss';

export default function PlayerTableData({
  player,
  playerHero,
  playerDetails,
}: {
  player: Player;
  playerHero: PlayerHero;
  playerDetails: PlayerDetails;
}) {
  return (
    <td className={styles.table__bodyCell}>
      <div className={styles.playerWrapper}>
        <HeroAndNickname player={player} playerHero={playerHero} />
        <RankAndAvatar playerDetails={playerDetails} />
      </div>
    </td>
  );
}
