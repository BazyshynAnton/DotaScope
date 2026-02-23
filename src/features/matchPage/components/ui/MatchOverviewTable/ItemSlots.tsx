import Image from 'next/image';

import { TableCell, Box } from '@mui/material';
import { findItem } from '@/features/matchPage/utils/find-item';
import { useMatchPageSelector } from '@/features/matchPage';
import { pxToRem } from '@/utils/px-to-rem';
import { envHelper } from '@/utils/env-helper';

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
        <Slots slots={mainSlots} items={constants.items} imgWidth={37} imgHeight={27} />
        <Slots slots={backpackSlots} items={constants.items} imgWidth={27} imgHeight={20} />
      </Box>
    </TableCell>
  );
}

function Slots({
  slots,
  items,
  imgWidth,
  imgHeight,
}: {
  slots: { reactKey: string; itemId: number }[];
  items: Items;
  imgWidth: number;
  imgHeight: number;
}) {
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

        const itemName = findItem(itemId, items);

        return (
          <Image
            key={reactKey}
            src={`${envHelper(process.env.NEXT_PUBLIC_ITEM_ICON_URL)}/${itemName}.png`}
            alt={itemName}
            width={imgWidth}
            height={imgHeight}
            style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}
          />
        );
      })}
    </Box>
  );
}
