import styles from '@/styles/matches-table.module.scss';

export default function TableHead() {
  return (
    <thead className={styles.table__head}>
      <tr className={styles.table__row}>
        {['League', 'Match ID', 'Duration', 'Radiant', 'Dire'].map((title) => (
          <th key={title} className={styles.table__cell}>
            {title}
          </th>
        ))}
      </tr>
    </thead>
  );
}
