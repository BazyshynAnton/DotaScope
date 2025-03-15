import PlayerRow from './PlayerRow';
import HeaderCells from './HeaderCells';

import { useAppSelector } from '@/hooks/use-app-selector';

import type { Player } from '@/types/statistic/match-data';

import styles from '@/styles/statistic/table-details.module.scss';

export default function TableDetails({ playersTeam }: { playersTeam: Player[] }) {
  const { matchDetails } = useAppSelector((store) => store.statisticSlice);

  const teamHeaderCondition = playersTeam[0].isRadiant
    ? styles.result__team__header_radiant
    : styles.result__team__header_dire;

  const side = playersTeam[0].isRadiant ? 'radiant' : 'dire';

  let teamName;
  switch (side) {
    case 'radiant': {
      teamName = matchDetails?.radiant_name ? matchDetails.radiant_name : `the ${side}`;
      break;
    }
    case 'dire': {
      teamName = matchDetails?.dire_name ? matchDetails.dire_name : `the ${side}`;
      break;
    }
  }

  if (teamName === '') teamName = 'TBD';

  return (
    <div className={styles.result}>
      <section className={styles.result__team}>
        <h1 className={`${styles.result__team__header} ${teamHeaderCondition}`}>{teamName}</h1>
        <div className={styles.result__team__tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.table__thead}>
              <tr className={styles.table__thead__headersTableRow}>
                <HeaderCells />
              </tr>
            </thead>
            <tbody>
              <PlayerRow playersTeam={playersTeam} />
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
