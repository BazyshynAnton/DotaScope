'use client';

import MatchSearch from '@/components/MatchSearch/MatchSearch';
import Loader from '@/components/Loader/Loader';
import MatchHeader from './MatchHeader';

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
        </>
      ) : (
        <Loader />
      )}
    </section>
  );
}
