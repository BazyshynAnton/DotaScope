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
    player.kills,
    player.deaths,
    player.assists,
    player.last_hits,
    player.denies,
    player.net_worth,
    player.gold_per_min,
    player.xp_per_min,
    player.hero_damage,
    player.tower_damage,
    player.hero_healing,
  ];

  return (
    <>
      {data.map((el) => (
        <PlayerStatisticTableCell key={el}>
          <PlayerStatisticBox>{el}</PlayerStatisticBox>
        </PlayerStatisticTableCell>
      ))}
    </>
  );
}
