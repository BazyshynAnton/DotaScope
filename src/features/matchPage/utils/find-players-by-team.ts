import type { Match, PlayersByTeam } from '@/features/matchPage/types';

export function filterPlayersByTeam(match: Match): PlayersByTeam {
  const radiant = match.players.filter((player) => player.isRadiant);
  const dire = match.players.filter((player) => !player.isRadiant);

  return { radiant, dire };
}
