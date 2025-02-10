import MetaTableBody from './MetaTableBody'

import type { HeroStats } from '@/types/meta/metaData'

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
    <>
      {sortedHeroes.map((hero) => {
        const winrate = ((hero[win] as number) / (hero[pick] as number)) * 100

        return (
          <MetaTableBody
            key={hero.name}
            heroName={hero.name}
            heroLocalizedName={hero.localized_name}
            winrate={winrate}
            pick={hero[pick] as number}
          />
        )
      })}
    </>
  )
}
