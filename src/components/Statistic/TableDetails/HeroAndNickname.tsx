import FacetDescription from './FacetDescription';

import { Image } from '@/shared/nextjs-imports';
import { useState } from '@/shared/react-imports';

import type { HeroDetails } from '@/types/statistic/player-row';
import type { Player } from '@/types/statistic/match-data';

import styles from '@/styles/statistic/player-row.module.scss';
import { Tooltip as ReactTooltip } from 'react-tooltip';

export default function HeroAndNickname({
  heroDetails,
  player,
}: {
  heroDetails: HeroDetails;
  player: Player;
}) {
  return (
    <div className={styles.heroAndNickname}>
      <div className={styles.heroAndNickname__hero}>
        <div
          className={styles.heroAndNickname__hero__icon}
          style={{
            borderRight: `3px solid ${heroDetails.playerColor}`,
          }}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_HERO_ICON_URL}${heroDetails.name}.png`}
            alt={heroDetails.localizedName}
            width={54}
            height={30}
          />
          {player.leaver_status !== 0 && (
            <Image
              src={process.env.NEXT_PUBLIC_DISCONNECT_IMG_URL as string}
              alt="disconnect"
              width={51}
              height={14.9}
              style={{ position: 'absolute', top: 0, left: 0 }}
            />
          )}
        </div>
        <div className={styles.heroAndNickname__hero__level}>{player.level}</div>
        <span
          data-tooltip-id={`${heroDetails.heroVariant.icon}${heroDetails.name}`}
          style={{
            background: `${heroDetails.heroVariant.color}`,
          }}
        >
          {heroDetails.heroVariant.icon && (
            <>
              <Image
                src={`${process.env.NEXT_PUBLIC_HERO_FACET_ICON_URL}${heroDetails.heroVariant.icon}.png`}
                alt={heroDetails.heroVariant.icon}
                width={72}
                height={72}
              />
              <ReactTooltip
                id={`${heroDetails.heroVariant.icon}${heroDetails.name}`}
                style={{
                  background: 'transparent',
                  boxShadow: 'none',
                }}
                // float={true}
                // noArrow={true}
              >
                <FacetDescription heroDetails={heroDetails} />
              </ReactTooltip>
            </>
          )}
        </span>
      </div>
      <div className={styles.heroAndNickname__nickname}>
        <div
          className={
            player.team_number === 0
              ? styles.heroAndNickname__nickname_radiant
              : styles.heroAndNickname__nickname_dire
          }
        >
          {/* {player.personaname ? player.personaname : "Anonymous"} */}
          {player.personaname ? 'Player' : 'Anonymous'}
        </div>
      </div>
    </div>
  );
}
