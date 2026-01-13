'use client';

import MatchSearch from '@/components/ui/MatchSearch/MatchSearch';
import {
  MatchHeader,
  MatchNotFoundError,
  MatchOverviewTable,
  useMatchPageDispatch,
  useMatchPageSelector,
  setMatchPageData,
  setPlayerProfiles,
  setDotaConstants,
  type Match,
  type DotaConstants,
  type MatchPageSlice,
  type PlayerProfile,
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
export default function MatchPageContent({
  matchData,
  playerProfiles,
  dotaConstants,
}: {
  matchData: Match | FetchError;
  playerProfiles: PlayerProfile[] | null;
  dotaConstants: DotaConstants;
}) {
  const { error: matchPageSliceError } = useMatchPageSelector<MatchPageSlice>(
    (store) => store.matchPageSlice
  );
  const dispatch = useMatchPageDispatch();

  useEffect(() => {
    if ('error' in matchData) {
      return;
    }

    dispatch(setMatchPageData(matchData));
    dispatch(setPlayerProfiles(playerProfiles));
    dispatch(setDotaConstants(dotaConstants));
  }, [dispatch, matchData, dotaConstants, playerProfiles]);

  if ('error' in matchData || matchPageSliceError) {
    return <MatchNotFoundError />;
  }

  // console.log(data, constants);

  return (
    <>
      <MatchSearch />
      <MatchHeader />
      <MatchOverviewTable isRadiant={true} />
      <MatchOverviewTable isRadiant={false} />
    </>
  );
}
