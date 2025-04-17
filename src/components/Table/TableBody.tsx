import { TableType } from './Table';
import { ProMatchesTableContent } from './ProMatchesTableContent';

import styles from '@/styles/table.module.scss';

export default function TableBody({ tableType }: { tableType: TableType }) {
  return (
    <tbody className={styles.table__body}>
      {tableType === TableType.ProMatches && <ProMatchesTableContent />}
    </tbody>
  );
}
