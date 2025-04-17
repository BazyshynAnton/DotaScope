import TableHead from './TableHead';
import TableBody from './TableBody';

import styles from '@/styles/table.module.scss';

export enum TableType {
  ProMatches = 0,
  MatchOverview,
}

export default function Table({ tableType, titles }: { tableType: TableType; titles: string[] }) {
  return (
    <table className={styles.table}>
      <TableHead tableType={tableType} titles={titles} />
      <TableBody tableType={tableType} />
    </table>
  );
}
