import type { Match, GameMode } from '@/features/matchPage/types';

/**
 * Returns game mode
 *
 * @param match Match data
 * @param gameMode Game modes
 * @returns {string}
 */
export function findGameMode(match: Match, gameMode: GameMode): string {
  const currMode = gameMode[match.game_mode].name.replace('game_mode_', '').replace('_', ' ') || '';

  if (!currMode) return '';

  const resultedMode = currMode.split('');
  for (let i = 0; i < resultedMode.length; ++i) {
    if (i === 0) resultedMode[i] = resultedMode[i].toUpperCase();
    if (resultedMode[i] === ' ') resultedMode[i + 1] = resultedMode[i + 1].toUpperCase();
  }

  return resultedMode.join('');
}
