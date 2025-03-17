import type {
  DotaConstants,
  GameMode,
  HeroList,
  League,
  LobbyType,
  Match,
  MatchData,
  MatchDetails,
  PlayerProfile,
  Region,
} from '@/types/statistic/match-data';
import { fetchHelper } from '../shared-utils';

import type { Items } from '@/types/statistic/player-row';

/**
 * Fetches all data related to a specific match using the OpenDota API.
 *
 * If no match ID is provided, the function generates a default match ID.
 *
 * @param {number} [matchId=0] - The ID of the match.
 * Defaults to `0`, in which case the function retrieves a default match ID.
 * @returns `Promise<MatchData | string>` An object containing match details, hero list,
 * and player profiles, or an error message if an error occurs.
 *
 * @throws `Error` Throws errors for invalid responses or failed API calls.
 *
 * Returned `MatchData` object structure:
 * - `heroListData` (HeroList[]): List of heroes fetched from the API.
 * - `matchDetailsData` (MatchDetails): Details about the specified match.
 * - `playerProfilesData` (PlayerProfile[]): Profile information of players in the match.
 */
export async function fetchMatchData(matchId: number = 0): Promise<MatchData | string> {
  try {
    if (matchId === 0) {
      const response = await genDefaultMatchID();
      if (typeof response === 'number') {
        matchId = response;
      } else if (response instanceof Error) throw response;
    }

    // Get data about the Last Played Match using Opendota API
    const matchDetailsData = await fetchHelper<MatchDetails>(
      (process.env.NEXT_PUBLIC_MATCH_DETAILS_URL as string) + matchId
    );
    if (matchDetailsData instanceof Error) throw matchDetailsData;

    // Array<number> store of player profile IDs
    const playerAccountIDs: number[] = [];
    // Set IDs to playersAccountIDs
    matchDetailsData.players.forEach((player) => playerAccountIDs.push(player.account_id));

    // Array<string> store of player profile links
    const playerProfilePromises = playerAccountIDs.map((accountID) =>
      fetch(`${process.env.NEXT_PUBLIC_PLAYER_PROFILE_URL}${accountID}`, { cache: 'no-store' })
    );
    // Fetch data about player profiles
    const playerProfileResponses = await Promise.all(playerProfilePromises);

    // Parse data about player profiles
    const playerProfilesData: PlayerProfile[] = await Promise.all(
      playerProfileResponses.map((response) => response.json())
    );

    return JSON.parse(
      JSON.stringify({
        matchDetailsData,
        playerProfilesData,
      } as MatchData)
    );
    //
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);

    return message;
  }
}

/**
 * Fetches Dota2 Constants using the OpenDota API.
 *
 * @returns `Promise<DotaConstants | string>` An object containing match details, hero list,
 * and player profiles, or an error message if an error occurs.
 *
 * @throws `Error` Throws errors for invalid responses or failed API calls.
 *
 * Returned `DotaConstants` object structure:
 * - `abilitiesData` (any): Object of all abilities.
 * - `heroAbilitiesData` (any): Object of hero abilities.
 * - `abilityIDs` (any): Object of ability IDs.
 * - `abilityIDsData` (Item): Object of ability IDs.
 * - `regionData` (Region): Object of regions.
 * - `gameModeData` (GameMode): Object of game mods.
 * - `lobbyTypeData` (LobbyType): Object of lobby types.
 */
export async function fetchDotaConstants(): Promise<DotaConstants | string> {
  try {
    // Get list of Heroes using Opendota API
    const heroListData = await fetchHelper<HeroList[]>(
      process.env.NEXT_PUBLIC_HERO_LIST_URL as string
    );
    if (heroListData instanceof Error) throw heroListData;

    // Get abilities object
    const abilitiesData = await fetchHelper<any>(process.env.NEXT_PUBLIC_ABILITIES_URL as string);
    if (abilitiesData instanceof Error) throw abilitiesData;

    // Get hero_abilities object
    const heroAbilitiesData = await fetchHelper<any>(
      process.env.NEXT_PUBLIC_HERO_ABILITIES_URL as string
    );
    if (heroAbilitiesData instanceof Error) throw heroAbilitiesData;

    // Get ability_ids object
    const abilityIDsData = await fetchHelper<any>(
      process.env.NEXT_PUBLIC_ABILITY_IDS_URL as string
    );
    if (abilityIDsData instanceof Error) throw abilityIDsData;

    // Get items object
    const itemsData = await fetchHelper<Items>(process.env.NEXT_PUBLIC_ITEMS_URL as string);
    if (itemsData instanceof Error) throw itemsData;
    // Get region object
    const regionData = await fetchHelper<Region>(process.env.NEXT_PUBLIC_REGION_URL as string);
    if (regionData instanceof Error) throw regionData;

    // Get game_mode object
    const gameModeData = await fetchHelper<GameMode>(
      process.env.NEXT_PUBLIC_GAME_MODE_URL as string
    );
    if (gameModeData instanceof Error) throw gameModeData;

    // Get lobby_type object
    const lobbyTypeData = await fetchHelper<LobbyType>(
      process.env.NEXT_PUBLIC_LOBBY_TYPE_URL as string
    );
    if (lobbyTypeData instanceof Error) throw lobbyTypeData;

    // Get leagues array
    const leaguesData = await fetchHelper<League[]>(process.env.NEXT_PUBLIC_LEAGUES_URL as string);
    if (leaguesData instanceof Error) throw leaguesData;

    return JSON.parse(
      JSON.stringify({
        heroListData,
        abilitiesData,
        heroAbilitiesData,
        abilityIDsData,
        itemsData,
        regionData,
        gameModeData,
        lobbyTypeData,
        leaguesData,
      } as DotaConstants)
    );
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);

    return message;
  }
}

/**
 * Fetches the most recent match ID from the
 * Cheng Jin Xiang "NothingToSay" match history.
 *
 *
 * This function retrieves the match history data
 * using the Opendota API, then extracts the match IDs
 * and returns the first one from the list.
 * If an error occurs, it returns the error message or
 * a string indicating the failure.
 *
 * @returns {Promise<number | Error | string>}
 * The match ID of the most recent match, or an error message
 * if the fetch operation fails.
 */
async function genDefaultMatchID(): Promise<number | Error | string> {
  // Get Matches History data using fetchHelper async func using Opendota API
  // Default player - Cheng Jin Xiang "NothingToSay"
  const matchesHistoryData = await fetchHelper<Match[]>(
    process.env.NEXT_PUBLIC_MATCH_HISTORY_URL as string
  );
  if (matchesHistoryData instanceof Error) throw matchesHistoryData;

  // Array<number> for store match IDs
  const matchHistoryDataIDs: number[] = [];
  // Set IDs to matchesHistoryDataIDs
  matchesHistoryData.forEach((match) => matchHistoryDataIDs.push(match.match_id));

  return matchHistoryDataIDs[0];
}
