import { Image } from '@/shared/nextjs-imports';
import { ReactTooltip } from '@/shared/react-imports';

import styles from '@/styles/match-tooltip-hero-facet.module.scss';

export default function TooltipHeroFacet({
  playerHero,
  isOpen,
}: {
  playerHero: PlayerHero;
  isOpen: boolean;
}) {
  return (
    <ReactTooltip
      id="hero-facet"
      place="right"
      opacity={1}
      className="tooltip"
      classNameArrow="tooltip-arrow"
      isOpen={isOpen}
      render={() => (
        <div className={styles.facet}>
          <div
            className={styles.facet__title}
            style={{
              background: `${playerHero.heroFacet.color}`,
            }}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_HERO_FACET_ICON_URL}${playerHero.heroFacet.icon}.png`}
              alt={playerHero.heroFacet.icon}
              width={50}
              height={50}
            />
            <h1>{playerHero.heroFacet.title}</h1>
          </div>
          <p className={styles.facet__description}>{playerHero.heroFacet.description}</p>
        </div>
      )}
    />
  );
}
