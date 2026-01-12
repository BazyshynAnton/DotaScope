import type { Match, PlayersByTeam } from '@/features/matchPage/types';

/**
 * Returns players by team
 *
 * @param match Match data
 * @returns {PlayersByTeam}
 */
export function filterPlayersByTeam(match: Match): PlayersByTeam {
  const radiant = match.players.filter((player) => player.isRadiant);
  const dire = match.players.filter((player) => !player.isRadiant);

  return { radiant, dire };
}
