import type { Player } from '@/features/matchPage/types';

/**
 * Returns item purchase time
 *
 * @param player Player data
 * @param itemName Item name
 * @returns {string}
 */
export function findItemTiming(player: Player, itemName: string) {
  if (!player.purchase_log) {
    return '';
  }

  for (const purchase of player.purchase_log) {
    if (itemName !== purchase.key) {
      continue;
    }

    let minutes = Math.floor(purchase.time / 60);
    let seconds = purchase.time % 60;

    if (minutes < 0 && seconds < 0) {
      minutes = -1;
      seconds *= -1;
    }

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  return '';
}
