'use client';

import {
  PlayerStatisticTableCell,
  PlayerStatisticBox,
} from '@/features/matchPage/styles/player-statistic';
import type { Player } from '@/features/matchPage/types';

/**
 * React component
 *
 * Implementation of the player statistic
 *
 * @param player Player
 * @returns {JSX.Element}
 */
export default function PlayerStatistic({ player }: { player: Player }) {
  const data = [
    { reactKey: 'kills', value: player.kills },
    { reactKey: 'deaths', value: player.deaths },
    { reactKey: 'assists', value: player.assists },
    { reactKey: 'last_hits', value: player.last_hits },
    { reactKey: 'denies', value: player.denies },
    { reactKey: 'net_worth', value: player.net_worth },
    { reactKey: 'gold_per_min', value: player.gold_per_min },
    { reactKey: 'xp_per_min', value: player.xp_per_min },
    { reactKey: 'hero_damage', value: player.hero_damage },
    { reactKey: 'tower_damage', value: player.tower_damage },
    { reactKey: 'hero_healing', value: player.hero_healing },
  ];

  return (
    <>
      {data.map(({ reactKey, value }) => (
        <PlayerStatisticTableCell key={reactKey}>
          <PlayerStatisticBox>{value}</PlayerStatisticBox>
        </PlayerStatisticTableCell>
      ))}
    </>
  );
}
