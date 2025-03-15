import HeaderCells from './HeaderCells';
import Hero from './Hero';

import type { Player } from '@/types/statistic/match-data';

import styles from '@/styles/statistic/table-abilities.module.scss';

export default function TableAbilities({ playersTeam }: { playersTeam: Player[] }) {
  const teamHeaderCondition = playersTeam[0].isRadiant
    ? styles.builds__header_radiant
    : styles.builds__header_dire;

  const side = playersTeam[0].isRadiant ? 'radiant' : 'dire';

  return (
    <section className={styles.builds}>
      <h1 className={`${styles.builds__header} ${teamHeaderCondition}`}>{side} builds</h1>
      <div className={styles.builds__tableWrapper}>
        <table className={styles.table}>
          <thead>
            <HeaderCells />
          </thead>
          <tbody>
            <Hero playersTeam={playersTeam} />
          </tbody>
        </table>
      </div>
    </section>
  );
}
