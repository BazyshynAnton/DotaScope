import type { Player } from '@/types/statistic/matchData'

import styles from '@/styles/statistic/PlayerRow.module.scss'

export default function PlayerStatistic({ player }: { player: Player }) {
  return (
    <>
      <PlayerDataCell statistic={player.kills} />
      <PlayerDataCell statistic={player.deaths} />
      <PlayerDataCell statistic={player.assists} />
      <PlayerDataCell statistic={player.last_hits} />
      <PlayerDataCell statistic={player.denies} />
      <PlayerDataCell statistic={player.net_worth} />
      <PlayerDataCell statistic={player.gold_per_min} />
      <PlayerDataCell statistic={player.xp_per_min} />
      <PlayerDataCell statistic={player.hero_damage} />
      <PlayerDataCell statistic={player.tower_damage} />
      <PlayerDataCell statistic={player.hero_healing} />
    </>
  )
}

function PlayerDataCell({ statistic }: { statistic: string | number }) {
  return (
    <td>
      <div className={styles.playerDataCell__statistic}>{statistic}</div>
    </td>
  )
}
