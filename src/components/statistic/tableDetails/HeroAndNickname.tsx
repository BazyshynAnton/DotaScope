import { Image } from '@/shared/nextjsImports'

import type { DetailsAboutHero } from '@/types/statistic/playerRow'
import type { Player } from '@/types/statistic/matchData'

import styles from '@/styles/statistic/PlayerRow.module.scss'

export default function HeroAndNickname({
  detailsAboutHero,
  player,
}: {
  detailsAboutHero: DetailsAboutHero
  player: Player
}) {
  return (
    <div className={styles.heroAndNickname}>
      <div className={styles.heroAndNickname__hero}>
        <div
          className={styles.heroAndNickname__hero__icon}
          style={{
            borderRight: `3px solid ${detailsAboutHero.playerColor}`,
          }}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_HERO_ICON_URL}${detailsAboutHero.heroName}.png`}
            alt={detailsAboutHero.heroLocalizedName}
            width={54}
            height={30}
          />
          {player.leaver_status !== 0 && (
            <Image
              src={process.env.NEXT_PUBLIC_DISCONNECT_IMG_URL as string}
              alt='disconnect'
              width={51}
              height={14.9}
              style={{ position: 'absolute', top: 0, left: 0 }}
            />
          )}
        </div>
        <div className={styles.heroAndNickname__hero__level}>{player.level}</div>
        <span
          style={{
            background: `${detailsAboutHero.heroVariant.color}`,
          }}
        >
          {detailsAboutHero.heroVariant.icon && (
            <Image
              src={`${process.env.NEXT_PUBLIC_HERO_FACET_ICON_URL}${detailsAboutHero.heroVariant.icon}.png`}
              alt={detailsAboutHero.heroVariant.icon}
              width={72}
              height={72}
            />
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
  )
}
