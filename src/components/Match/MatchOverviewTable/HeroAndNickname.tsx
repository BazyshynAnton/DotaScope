import { Image } from '@/shared/nextjs-imports';

import type { Player } from '@/types/matches-page';
import type { PlayerHero } from '@/types/match-overview-player-row';

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
        <div
          className={styles.heroIcon}
          style={{
            borderRight: `3px solid ${playerHero.playerColor}`,
          }}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_HERO_ICON_URL}${playerHero.name}.png`}
            alt={playerHero.localizedName}
            width={54}
            height={30}
          />
          {player.leaver_status !== 0 && (
            <Image
              src={process.env.NEXT_PUBLIC_DISCONNECT_ICON_URL as string}
              alt="Disconnect"
              width={51}
              height={14.9}
              style={{ position: 'absolute', top: 0, left: 0 }}
            />
          )}
        </div>
        <div className={styles.heroLevel}>{player.level}</div>
        <span
          style={{
            background: `${playerHero.heroFacet.color}`,
          }}
          //   onMouseEnter={handleFacetEnter}
          //   onMouseLeave={handleFacetLeave}
        >
          {playerHero.heroFacet.icon && (
            <>
              <Image
                src={`${process.env.NEXT_PUBLIC_HERO_FACET_ICON_URL}${playerHero.heroFacet.icon}.png`}
                alt={playerHero.heroFacet.icon}
                width={72}
                height={72}
              />
              {/* {isFacetTooltip && <FacetDescription playerHero={playerHero} />} */}
            </>
          )}
        </span>
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
