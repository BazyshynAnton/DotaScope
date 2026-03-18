import { PermanentBuffs, PlayerPermanentBuffs } from '@/features/matchPage/types';

/**
 * Returns organized information about player buffs
 *
 * @param playerPermanentBuffs Player permanent buffs
 * @param permanentBuffs Permanent buffs
 * @returns {{name:string, stackCount:number}[]}
 */
export function findBuffs(
  playerPermanentBuffs: PlayerPermanentBuffs,
  permanentBuffs: PermanentBuffs
) {
  const buffs = [];

  for (const buff of playerPermanentBuffs) {
    buffs.push({
      name: permanentBuffs[buff.permanent_buff],
      stackCount: buff.stack_count,
    });
  }

  return buffs;
}
