import TableHead from './TableHead';
import TableBody from './TableBody';

import styles from '@/styles/table.module.scss';

export default function Table({ tableType, titles }: { tableType: string; titles: string[] }) {
  return (
    <table className={styles.table}>
      <TableHead titles={titles} />
      <TableBody tableType={tableType} />
    </table>
  );
}
