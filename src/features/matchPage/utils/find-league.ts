import type { Match, League } from '@/features/matchPage/types';

/**
 * Returns league
 *
 * @param match Match data
 * @param leagues Leagues
 * @returns {string}
 */
export function findLeague(match: Match, leagues: League[]): string {
  let resultedLeague = '';

  leagues.some((league) => {
    if (match.leagueid !== 0 && match.leagueid === league.leagueid) {
      resultedLeague = league.name;
      return true;
    }
  });

  return resultedLeague;
}
