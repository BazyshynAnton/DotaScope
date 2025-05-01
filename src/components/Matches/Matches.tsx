'use client';

import MatchSearch from '@/components/MatchSearch/MatchSearch';
import Table, { TableType } from '@/components/Table/Table';
import Loader from '@/components/Loader/Loader';

import { setMatchesPageData } from '@/store/matches-page-slice';
import { useAppSelector } from '@/hooks/use-app-selector';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useEffect } from '@/shared/react-imports';

import styles from '@/styles/matches.module.scss';

export default function Matches({
  matchesPageData,
}: {
  matchesPageData: MatchesPageData | string;
}) {
  const { proMatches, error } = useAppSelector((store) => store.matchesPageSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setMatchesPageData(matchesPageData));
  }, []);

  if (error !== null) {
    throw new Error(error);
  }

  return (
    <section className={styles.matches}>
      <MatchSearch />
      <div className={styles.matches__tableWrapper}>
        {proMatches ? (
          <Table
            tableType={TableType.ProMatches}
            titles={['League', 'Match ID', 'Duration', 'Radiant', 'Dire']}
          />
        ) : (
          <Loader />
        )}
      </div>
    </section>
  );
}
