'use client';

import Search from './Search';
import Table from '@/components/Table/Table';

import { setMatchesPageData } from '@/store/matches-page-slice';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useEffect } from '@/shared/react-imports';

import type { MatchesPageData } from '@/types/matches-page';

import styles from '@/styles/matches.module.scss';

export default function Matches({
  matchesPageData,
}: {
  matchesPageData: MatchesPageData | string;
}) {
  console.log(matchesPageData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setMatchesPageData(matchesPageData));
  }, []);

  return (
    <section className={styles.matches}>
      <Search />
      <Table
        tableType="matches-page-table"
        titles={['League', 'Match ID', 'Duration', 'Radiant', 'Dire']}
      />
    </section>
  );
}
