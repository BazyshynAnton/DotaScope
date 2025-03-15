import MetaTableBody from './MetaTableBody';

import { sortHeroes } from './Meta';

import type { HeroStats, TableSort } from '@/types/meta/meta-data';

export default function MetaPro({
  heroStats,
  tableSort,
}: {
  heroStats: HeroStats[];
  tableSort: TableSort;
}) {
  const win = 'pro_win' as keyof HeroStats;
  const pick = 'pro_pick' as keyof HeroStats;

  const sortedHeroes: HeroStats[] = sortHeroes(heroStats, { win, pick }, tableSort);

  return (
    <>
      {sortedHeroes.map((hero) => {
        const winrate = ((hero[win] as number) / (hero[pick] as number)) * 100;

        return (
          <MetaTableBody
            key={hero.name}
            heroName={hero.name}
            heroLocalizedName={hero.localized_name}
            winrate={winrate}
            pick={hero[pick] as number}
          />
        );
      })}
    </>
  );
}
