import TooltipHeroFacet from './TooltipHeroFacet';

import { Image } from '@/shared/nextjs-imports';
import { useState } from '@/shared/react-imports';

import type { MouseEvent } from 'react';

import styles from '@/styles/match-overview-table-content.module.scss';

export default function HeroFacet({ playerHero }: { playerHero: PlayerHero }) {
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
