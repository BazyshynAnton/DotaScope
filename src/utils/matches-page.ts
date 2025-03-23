import { fetchHelper, errorToString } from './common';

import type { MatchesPageData, ProMatch, Team } from '@/types/matches-page';

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
