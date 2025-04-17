'use client';

import MatchSearch from '@/components/MatchSearch/MatchSearch';
import Loader from '@/components/Loader/Loader';
import Table, { TableType } from '@/components/Table/Table';
import MatchHeader from './MatchHeader';
import MatchResult from './MatchResult';

import { useEffect } from '@/shared/react-imports';
import { useAppSelector } from '@/hooks/use-app-selector';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { setMatchPageData, setDotaConstants } from '@/store/match-page-slice';

import type { MatchPageData, DotaConstants } from '@/types/matches-page';

import styles from '@/styles/match.module.scss';

export default function Match({
  matchPageData,
  dotaConstants,
}: {
  matchPageData: MatchPageData | string;
  dotaConstants: DotaConstants | string;
}) {
  const { matchData, constants, error } = useAppSelector((store) => store.matchPageSlice);

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
          <MatchSearch />
          <MatchHeader />
          <MatchResult />
          <OverviewTable />
        </>
      ) : (
        <Loader />
      )}
    </section>
  );
}

function OverviewTable() {
  return (
    <section className={styles.match__overview}>
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
      />
    </section>
  );
}
