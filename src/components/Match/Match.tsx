'use client';

// import MatchSearch from '@/components/MatchSearch/MatchSearch';
import Loader from '@/components/Loader/Loader';
import Table, { TableType } from '@/components/Table/Table';
import MatchHeader from './MatchHeader';
import MatchResult from './MatchResult';

import { useEffect } from '@/shared/react-imports';
import { useAppSelector } from '@/hooks/use-app-selector';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { setMatchPageData, setDotaConstants } from '@/store/match-page-slice';

import styles from '@/styles/match.module.scss';

export default function Match({
  matchPageData,
  dotaConstants,
}: {
  matchPageData: MatchPageData | string;
  dotaConstants: DotaConstants | string;
}) {
  const { matchData, constants, error } = useAppSelector(
    (store) => store.matchPageSlice as MatchPageSlice
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setMatchPageData(matchPageData));
    dispatch(setDotaConstants(dotaConstants));
  }, []);

  if (error !== null) {
    throw new Error(error);
  }

  return (
    <section className={styles.match}>
      {matchData && constants ? (
        <>
          {/* <MatchSearch /> Doesn't work */}
          <MatchHeader />
          <MatchResult />
          <MatchOverviewTable teamName={matchData.match.radiant_name} isRadiant={true} />
          <MatchOverviewTable teamName={matchData.match.dire_name} isRadiant={false} />
        </>
      ) : (
        <div className={styles.match__loader}>
          <Loader />
        </div>
      )}
    </section>
  );
}

function MatchOverviewTable({ teamName, isRadiant }: { teamName: string; isRadiant: boolean }) {
  return (
    <section className={styles.match__overview}>
      <h1
        className={`${styles.match__teamName} ${isRadiant ? styles.match__teamName_radiant : styles.match__teamName_dire}`}
      >
        {teamName || `The ${isRadiant ? 'Radiant' : 'Dire'}`}
      </h1>
      <Table
        tableType={TableType.MatchOverview}
        titles={[
          'PLAYER',
          'K/Hero Kills',
          'D/Hero Deaths',
          'A/Hero Assists',
          'LH/Number of creeps killed by hero',
          'DN/Number of creeps denied by hero',
          'NET/Net Worth',
          'GPM/Gold Per Minute',
          'XPM/Experience Per Minute',
          'HD/Damage dealt to heroes',
          'TD/Damage dealt to buildings',
          'HH/Health restored to heroes',
          'ITEMS/Items built',
        ]}
        matchOverviewTableData={{ isRadiant }}
      />
    </section>
  );
}
