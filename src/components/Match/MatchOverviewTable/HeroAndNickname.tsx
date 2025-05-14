import HeroIcon from './HeroIcon';
import HeroFacet from './HeroFacet';

import styles from '@/styles/match-overview-table-content.module.scss';

export default function HeroAndNickname({
  player,
  playerHero,
}: {
  player: Player;
  playerHero: PlayerHero;
}) {
  return (
    <div className={styles.heroAndNickname}>
      <div className={styles.hero}>
        <HeroIcon player={player} playerHero={playerHero} />
        <div className={styles.heroLevel}>{player.level}</div>
        <HeroFacet playerHero={playerHero} />
      </div>
      <div className={styles.nickname}>
        <div className={player.team_number === 0 ? styles.nickname_radiant : styles.nickname_dire}>
          {/* {player.personaname ? player.personaname : 'Anonymous'} */}
          {player.personaname ? 'Player' : 'Anonymous'}
        </div>
      </div>
    </div>
  );
}
