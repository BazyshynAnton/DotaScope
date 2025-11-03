'use client';

import MatchSearch from '@/components/ui/MatchSearch/MatchSearch';
import {
  MatchHeader,
  // useMatchPageDispatch,
  // setMatchPageData,
  type Match,
} from '@/features/matchPage';
import { FetchError } from '@/types';

/**
 * React component
 *
 * Implementation of the match page content
 *
 * @returns {JSX.Element}
 */
export default function MatchPageContent({ matchData }: { matchData: Match | FetchError }) {
  // const dispatch = useMatchPageDispatch();

  // Type guard
  if ('error' in matchData) {
    return (
      <>
        <MatchSearch />
        <h1>Match not found.</h1>
      </>
    );
  }

  // dispatch(setMatchPageData(matchData));

  return (
    <>
      <MatchSearch />
      <MatchHeader />
    </>
  );
}
