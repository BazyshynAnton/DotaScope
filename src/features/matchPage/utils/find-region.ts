import type { Match, Region } from '@/features/matchPage/types';

/**
 * Returns region
 *
 * @param match Match data
 * @param region Region
 * @returns {string}
 */
export function findRegion(match: Match, region: Region): string {
  const currRegion = region[match.region];

  if (!currRegion) return '';

  const resultedRegion = currRegion.toLowerCase().split('');
  resultedRegion.forEach((el, idx) => {
    if (idx === 0) {
      return (resultedRegion[idx] = resultedRegion[idx].toUpperCase());
    }
    if (el === ' ') {
      return (resultedRegion[idx + 1] = resultedRegion[idx + 1].toUpperCase());
    }
  });

  return resultedRegion.join('');
}
