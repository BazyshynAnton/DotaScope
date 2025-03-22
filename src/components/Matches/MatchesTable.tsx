import TableHead from './TableHead';

import styles from '@/styles/matches-table.module.scss';

export default function MatchesTable() {
  return (
    <table className={styles.table}>
      <TableHead />
    </table>
  );
}
