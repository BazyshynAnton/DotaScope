import { TableType } from './Table';

import { React, ReactTooltip } from '@/shared/react-imports';

import styles from '@/styles/table.module.scss';

export default function TableHead({
  tableType,
  titles,
}: {
  tableType: TableType;
  titles: string[];
}) {
  return (
    <thead className={styles.table__head}>
      <tr className={styles.table__headRow}>
        {titles.map((title) => (
          <React.Fragment key={title}>
            {tableType === TableType.ProMatches && <ProMatchesTableHead title={title} />}
            {tableType === TableType.MatchOverview && <MatchOverviewTableHead title={title} />}
          </React.Fragment>
        ))}
      </tr>
    </thead>
  );
}

function ProMatchesTableHead({ title }: { title: string }) {
  return <th className={styles.table__headCell}>{title}</th>;
}

function MatchOverviewTableHead({ title }: { title: string }) {
  const [realTitle, tooltip] = title.split('/');

  return (
    <th
      data-tooltip-id={realTitle}
      className={`${styles.table__headCell} ${styles.table__headCell_matchOverview}`}
    >
      {realTitle}
      <ReactTooltip
        id={realTitle}
        place="top"
        content={tooltip}
        className={styles.table__matchOverviewTooltip}
      />
    </th>
  );
}
