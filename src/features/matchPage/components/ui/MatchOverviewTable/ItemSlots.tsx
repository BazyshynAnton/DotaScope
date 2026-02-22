import Image from 'next/image';

import { TableCell, Box } from '@mui/material';
import { findItem } from '@/features/matchPage/utils/find-item';
import { useMatchPageSelector } from '@/features/matchPage';
import { pxToRem } from '@/utils/px-to-rem';
import { envHelper } from '@/utils/env-helper';

import type { MatchPageSlice, Player } from '@/features/matchPage/types';

// TODO: create reusable components and styled components

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
        <Box
          sx={{
            display: 'flex',
            gap: pxToRem(3),
          }}
        >
          {mainSlots.map(({ reactKey, itemId }) => {
            const itemName = findItem(itemId, constants.items);
            const itemImage =
              itemId !== 0
                ? `${envHelper(process.env.NEXT_PUBLIC_ITEM_ICON_URL)}/${itemName}.png`
                : '/images/items/empty-slot.webp';

            return (
              <Image
                key={reactKey}
                src={itemImage}
                alt={itemName || 'empty_slot'}
                width={37}
                height={27}
                style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}
              />
            );
          })}
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: pxToRem(3),
          }}
        >
          {backpackSlots.map(({ reactKey, itemId }) => {
            const itemName = findItem(itemId, constants.items);
            const itemImage =
              itemId !== 0
                ? `${envHelper(process.env.NEXT_PUBLIC_ITEM_ICON_URL)}/${itemName}.png`
                : '/images/items/empty-slot.webp';

            return (
              <Image
                key={reactKey}
                src={itemImage}
                alt={itemName || 'empty_slot'}
                width={27}
                height={20}
                style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}
              />
            );
          })}
        </Box>
      </Box>
    </TableCell>
  );
}
