import styles from '@/styles/table.module.scss';

export default function TableHead({ titles }: { titles: string[] }) {
  return (
    <thead className={styles.table__head}>
      <tr className={styles.table__headRow}>
        {titles.map((title) => (
          <th key={title} className={styles.table__headCell}>
            {title}
          </th>
        ))}
      </tr>
    </thead>
  );
}
