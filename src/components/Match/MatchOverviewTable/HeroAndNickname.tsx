import TooltipHeroFacet from './TooltipHeroFacet';

import { Image } from '@/shared/nextjs-imports';
import { ReactTooltip, useState } from '@/shared/react-imports';

import type { MouseEvent } from 'react';

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

function HeroIcon({ player, playerHero }: { player: Player; playerHero: PlayerHero }) {
  return (
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
  );
}

function HeroFacet({ playerHero }: { playerHero: PlayerHero }) {
  const [isFacetTooltip, setIsFacetTooltip] = useState(false);

  const handleFacetEnter = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    setIsFacetTooltip(true);
  };
  const handleFacetLeave = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    setIsFacetTooltip(false);
  };

  return (
    <div
      data-tooltip-id="hero-facet"
      className={styles.heroFacet}
      style={{
        background: `${playerHero.heroFacet.color}`,
      }}
      onMouseEnter={handleFacetEnter}
      onMouseLeave={handleFacetLeave}
    >
      {playerHero.heroFacet.icon && (
        <Image
          src={`${process.env.NEXT_PUBLIC_HERO_FACET_ICON_URL}${playerHero.heroFacet.icon}.png`}
          alt={playerHero.heroFacet.icon}
          width={20}
          height={20}
        />
      )}
      <TooltipHeroFacet playerHero={playerHero} isOpen={isFacetTooltip} />
    </div>
  );
}
