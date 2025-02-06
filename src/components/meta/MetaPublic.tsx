import { Image } from '@/shared/nextjsImports'

import type { HeroStats } from '@/types/meta/metaData'

import styles from '@/styles/meta/Meta.module.scss'

export default function MetaPublic({
  currRank,
  heroStats,
}: {
  currRank: number
  heroStats: HeroStats[]
}) {
  const pick = `${currRank}_pick` as keyof HeroStats
  const win = `${currRank}_win` as keyof HeroStats

  const sortedHeroes: HeroStats[] = heroStats
    .filter((hero) => (hero[pick] as number) > 0)
    .sort(
      (a, b) =>
        ((b[win] as number) / (b[pick] as number)) * 100 -
        ((a[win] as number) / (a[pick] as number)) * 100,
    )

  return (
    <div className={styles.metaPub}>
      {sortedHeroes.map((hero) => {
        const winrate = ((hero[win] as number) / (hero[pick] as number)) * 100

        return (
          <tr key={hero.name}>
            <td>
              <div>
                <Image
                  src={`${process.env.NEXT_PUBLIC_HERO_ICON_URL as string}${hero.name.replace('npc_dota_hero_', '')}.png`}
                  alt={hero.name}
                  width={54}
                  height={30}
                />
                <p>{hero.localized_name}</p>
              </div>
            </td>
            <td>
              <div>
                <p>{Math.round((winrate + Number.EPSILON) * 100) / 100}</p>
              </div>
            </td>
            <td>
              <div>
                <p>{hero[pick]}</p>
              </div>
            </td>
          </tr>
        )
      })}
    </div>
  )
}
