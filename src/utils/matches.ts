import { fetchHelper, errorToString } from './common';

import type { MatchesPageData, ProMatch, Team } from '@/types/matches-page';

export async function fetchMatchesPageData(): Promise<MatchesPageData | string> {
  try {
    // TODO: change cache to 'no-cache'
    const proMatches = await fetchHelper<ProMatch[]>(
      process.env.NEXT_PUBLIC_PRO_MATCHES_URL as string
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

    const teamsPromisses = [];
    // TODO: iterate through the map and set the array of promisses and then use Promise all
    //for(let [_, value] of teamIdStore){

    //}

    return JSON.parse(JSON.stringify({ proMatches })) as MatchesPageData;
  } catch (error) {
    return errorToString(error);
  }
}
