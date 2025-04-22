import ProMatchesTableContent from '@/components/Matches/ProMatchesTable/ProMatchesTableContent';
import MatchOverviewTableContent from '@/components/Match/MatchOverviewTable/MatchOverviewTableContent';

import { TableType } from './Table';

import styles from '@/styles/table.module.scss';

export default function TableBody({
  tableType,
  matchOverviewTableData,
}: {
  tableType: TableType;
  matchOverviewTableData?: {
    isRadiant: boolean;
  };
}) {
  return (
    <tbody className={styles.table__body}>
      {tableType === TableType.ProMatches && <ProMatchesTableContent />}
      {tableType === TableType.MatchOverview && (
        <MatchOverviewTableContent matchOverviewTableData={matchOverviewTableData} />
      )}
    </tbody>
  );
}
