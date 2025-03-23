import { MatchesPageTableBody } from './MatchesPageTableContent';

import styles from '@/styles/table.module.scss';

export default function TableBody({ tableType }: { tableType: string }) {
  return (
    <tbody className={styles.table__body}>
      {tableType === 'matches-page-table' && <MatchesPageTableBody />}
    </tbody>
  );
}
