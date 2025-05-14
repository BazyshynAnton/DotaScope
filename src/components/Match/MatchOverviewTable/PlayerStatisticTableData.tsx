import styles from '@/styles/match-overview-table-content.module.scss';

export default function PlayerStatisticTableData({ player }: { player: Player }) {
  return (
    <>
      <td className={styles.table__bodyCell}>
        <div className={styles.statistic}>{player.kills}</div>
      </td>
      <td className={styles.table__bodyCell}>
        <div className={styles.statistic}>{player.deaths}</div>
      </td>
      <td className={styles.table__bodyCell}>
        <div className={styles.statistic}>{player.assists}</div>
      </td>
      <td className={styles.table__bodyCell}>
        <div className={styles.statistic}>{player.last_hits}</div>
      </td>
      <td className={styles.table__bodyCell}>
        <div className={styles.statistic}>{player.denies}</div>
      </td>
      <td className={styles.table__bodyCell}>
        <div className={styles.statistic}>{player.net_worth}</div>
      </td>
      <td className={styles.table__bodyCell}>
        <div className={styles.statistic}>{player.gold_per_min}</div>
      </td>
      <td className={styles.table__bodyCell}>
        <div className={styles.statistic}>{player.xp_per_min}</div>
      </td>
      <td className={styles.table__bodyCell}>
        <div className={styles.statistic}>{player.hero_damage}</div>
      </td>
      <td className={styles.table__bodyCell}>
        <div className={styles.statistic}>{player.tower_damage}</div>
      </td>
      <td className={styles.table__bodyCell}>
        <div className={styles.statistic}>{player.hero_healing}</div>
      </td>
    </>
  );
}
