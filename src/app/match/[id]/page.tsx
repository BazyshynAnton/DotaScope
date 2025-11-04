import MatchPageContent from '@/components/pages/MatchPageContent/MatchPageContent';

import { OpenDota } from 'opendota.js';
import { StoreProvider, type Match, type DotaConstants } from '@/features/matchPage';
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
  const dotaConstants: DotaConstants = {
    heroes: await openDota.getConstants('heroes'),
    heroAbilities: await openDota.getConstants('hero_abilities'),
    abilityIds: await openDota.getConstants('ability_ids'),
    items: await openDota.getConstants('items'),
    region: await openDota.getConstants('region'),
    gameMode: await openDota.getConstants('game_mode'),
    lobbyType: await openDota.getConstants('lobby_type'),
    leagues: await openDota.getLeagues(),
  };

  return (
    <StoreProvider>
      <MatchPageContent matchData={matchData} dotaConstants={dotaConstants} />
    </StoreProvider>
  );
}
