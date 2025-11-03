import MatchPageContent from '@/components/pages/MatchPageContent/MatchPageContent';

import { OpenDota } from 'opendota.js';
import { StoreProvider, type Match } from '@/features/matchPage';
import { FetchError } from '@/types';

/**
 * React component
 *
 * Implementation of the match page
 *
 * @returns {JSX.Element}
 */
export default async function MatchPage({ params }: { params: { id: string } }) {
  const { id: matchID } = await params;
  const openDota = new OpenDota();
  const matchData: Match | FetchError = await openDota.getMatch(parseInt(matchID));

  return (
    <StoreProvider>
      <MatchPageContent matchData={matchData} />
    </StoreProvider>
  );
}
