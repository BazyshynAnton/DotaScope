'use client';

import MatchSearch from '@/components/ui/MatchSearch/MatchSearch';
import {
  MatchHeader,
  MatchNotFoundError,
  useMatchPageDispatch,
  setMatchPageData,
  type Match,
} from '@/features/matchPage';
import { useEffect } from 'react';
import type { FetchError } from '@/types';

/**
 * React component
 *
 * Implementation of the match page content
 *
 * @returns {JSX.Element}
 */
export default function MatchPageContent({ matchData }: { matchData: Match | FetchError }) {
  const dispatch = useMatchPageDispatch();

  useEffect(() => {
    if ('error' in matchData) {
      return;
    }

    dispatch(setMatchPageData(matchData));
  }, [dispatch, matchData]);

  // Type guard
  if ('error' in matchData) {
    return <MatchNotFoundError />;
  }

  return (
    <>
      <MatchSearch />
      <MatchHeader />
    </>
  );
}
