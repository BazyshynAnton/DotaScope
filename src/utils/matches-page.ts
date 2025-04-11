import { fetchHelper, errorToString } from './common';

import type {
  MatchesPageData,
  ProMatch,
  Team,
  MatchPageData,
  Match,
  PlayerProfile,
  Hero,
  Items,
  Region,
  GameMode,
  LobbyType,
  League,
  DotaConstants,
} from '@/types/matches-page';

export async function fetchMatchesPageData(): Promise<MatchesPageData | string> {
  try {
    // TODO: change cache to 'no-cache'
    const proMatches = await fetchHelper<ProMatch[]>(
      process.env.NEXT_PRIVATE_PRO_MATCHES_URL as string
    );

    // store all IDs for an appropriate team in a map
    const teamIdStore = new Map<string, number>();

    proMatches.forEach((match: ProMatch) => {
      if (!teamIdStore.has(match.radiant_name)) {
        teamIdStore.set(match.radiant_name, match.radiant_team_id);
      }

      if (!teamIdStore.has(match.dire_name)) {
        teamIdStore.set(match.dire_name, match.dire_team_id);
      }
    });

    const teams = await Promise.all(
      Array.from(teamIdStore.values()).map(async (value) => {
        return await fetchHelper<Team>(`${process.env.NEXT_PRIVATE_TEAM_URL}${value}`);
      })
    );

    return { proMatches, teams } as MatchesPageData;
  } catch (error) {
    return errorToString(error);
  }
}

export function findLogoUrl(teamId: number, teams: Team[]) {
  let logoUrl = '';

  for (const team of teams) {
    if (teamId === team.team_id) {
      logoUrl = team.logo_url;
      return logoUrl;
    }
  }

  return logoUrl;
}

export async function fetchMatchPageData(matchId: number): Promise<MatchPageData | string> {
  try {
    const match = await fetchHelper<Match>(`${process.env.NEXT_PRIVATE_MATCH_URL}${matchId}`);

    const playerIds: number[] = new Array(match.players.length);
    // set playerIds
    for (let i = 0; i < playerIds.length; ++i) {
      playerIds[i] = match.players[i].account_id;
    }

    const playerProfiles = await Promise.all(
      playerIds.map(async (playerId) => {
        return playerId !== undefined
          ? await fetchHelper<PlayerProfile>(
              `${process.env.NEXT_PRIVATE_PLAYER_PROFILE_URL}${playerId}`
            )
          : ({} as PlayerProfile);
      })
    );

    return { match, playerProfiles } as MatchPageData;
  } catch (error) {
    return errorToString(error);
  }
}

export async function fetchDotaConstants() {
  try {
    const heroes = await fetchHelper<Hero[]>(process.env.NEXT_PRIVATE_HERO_LIST_URL as string);

    const abilities = await fetchHelper<any>(process.env.NEXT_PRIVATE_ABILITIES_URL as string);

    const abilityIds = await fetchHelper<any>(process.env.NEXT_PRIVATE_ABILITY_IDS_URL as string);

    const items = await fetchHelper<Items>(process.env.NEXT_PRIVATE_ITEMS_URL as string);

    const region = await fetchHelper<Region>(process.env.NEXT_PRIVATE_REGION_URL as string);

    const gameMode = await fetchHelper<GameMode>(process.env.NEXT_PRIVATE_GAME_MODE_URL as string);

    const lobbyType = await fetchHelper<LobbyType>(
      process.env.NEXT_PRIVATE_LOBBY_TYPE_URL as string
    );

    const leagues = await fetchHelper<League[]>(process.env.NEXT_PRIVATE_LEAGUES_URL as string);

    return {
      heroes,
      abilities,
      abilityIds,
      items,
      region,
      gameMode,
      lobbyType,
      leagues,
    } as DotaConstants;
  } catch (error) {
    return errorToString(error);
  }
}
