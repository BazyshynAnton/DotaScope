import { Items } from '@/features/matchPage/types';

/**
 * Returns item name
 *
 * @param itemId Item ID
 * @param items All in-game items
 * @returns {string}
 */
export function findItem(itemId: number, items: Items): string {
  let itemName = '';

  for (const [currentItemName, itemData] of Object.entries(items)) {
    if (itemId === itemData.id) {
      itemName = currentItemName;
      break;
    }
  }

  return itemName;
}
