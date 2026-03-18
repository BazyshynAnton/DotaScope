import Image from 'next/image';
import React from 'react';
import Buffs from './Buffs';

import { TableCell, Box } from '@mui/material';
import { findItem } from '@/features/matchPage/utils/find-item';
import { useMatchPageSelector } from '@/features/matchPage';
import { pxToRem } from '@/utils/px-to-rem';
import { envHelper } from '@/utils/env-helper';
import { findItemTiming } from '@/features/matchPage/utils/find-item-timing';

import {
  BackpackSlotsItemTiming,
  MainSlotsItemTiming,
} from '@/features/matchPage/styles/item-slots';

import type { Items, MatchPageSlice, Player } from '@/features/matchPage/types';

/**
 * React component
 *
 * Implementation of the item slots
 *
 * @param player Player
 * @returns {JSX.Element|null}
 */
export default function ItemSlots({ player }: { player: Player }) {
  const { constants } = useMatchPageSelector<MatchPageSlice>((store) => store.matchPageSlice);

  if (!constants) {
    return null;
  }

  const mainSlots = [
    { reactKey: 'item_0', itemId: player.item_0 },
    { reactKey: 'item_1', itemId: player.item_1 },
    { reactKey: 'item_2', itemId: player.item_2 },
    { reactKey: 'item_3', itemId: player.item_3 },
    { reactKey: 'item_4', itemId: player.item_4 },
    { reactKey: 'item_5', itemId: player.item_5 },
  ];

  const backpackSlots = [
    { reactKey: 'backpack_0', itemId: player.backpack_0 },
    { reactKey: 'backpack_1', itemId: player.backpack_1 },
    { reactKey: 'backpack_2', itemId: player.backpack_2 },
  ];

  return (
    <TableCell>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: pxToRem(3) }}>
        <Buffs player={player} />
        <Slots
          slots={mainSlots}
          player={player}
          items={constants.items}
          imgWidth={37}
          imgHeight={27}
        />
        <Slots
          slots={backpackSlots}
          player={player}
          items={constants.items}
          imgWidth={27}
          imgHeight={20}
        />
      </Box>
    </TableCell>
  );
}

function Slots({
  slots,
  player,
  items,
  imgWidth,
  imgHeight,
}: {
  slots: { reactKey: string; itemId: number }[];
  player: Player;
  items: Items;
  imgWidth: number;
  imgHeight: number;
}) {
  const isMainSlots = slots.length === 6;

  return (
    <Box
      sx={{
        display: 'flex',
        gap: pxToRem(3),
      }}
    >
      {slots.map(({ reactKey, itemId }) => {
        if (!itemId) {
          return null;
        }

        const currItemName = findItem(itemId, items);
        const itemName = !currItemName.includes('recipe') ? currItemName : 'recipe';
        const itemTiming = findItemTiming(player, itemName);

        return (
          <Box key={reactKey}>
            <Box sx={{ position: 'relative', width: imgWidth, height: imgHeight }}>
              <Image
                src={`${envHelper(process.env.NEXT_PUBLIC_ITEM_ICON_URL)}/${itemName}.png`}
                alt={itemName}
                width={imgWidth}
                height={imgHeight}
                style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}
              />
              {isMainSlots && <MainSlotsItemTiming>{itemTiming}</MainSlotsItemTiming>}
            </Box>
            {!isMainSlots && <BackpackSlotsItemTiming>{itemTiming}</BackpackSlotsItemTiming>}
          </Box>
        );
      })}
    </Box>
  );
}
