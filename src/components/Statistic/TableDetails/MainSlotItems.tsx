import ItemDescription from './ItemDescription';
import CannotFindItems from './CannotFindItems';

import { Image } from '@/shared/nextjs-imports';
import { React, useState } from '@/shared/react-imports';
import { PlayerRowUtility } from '@/utils/statistic/player-row-utility';

import type { SlotInterface } from '@/types/statistic/player-row';

import styles from '@/styles/statistic/player-row.module.scss';

// Initial State for useState in MainSlotItems component.
const initialStateMainSlot = {
  0: false,
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
};

export default function MainSlotItems({ itemDetails, player }: SlotInterface) {
  //
  //
  // State for manage tooltip about each item.
  const [toolTipStatus, setToolTipStatus] = useState<{
    [idx: string]: boolean;
  }>(initialStateMainSlot);

  // Check data
  if (!itemDetails) return <CannotFindItems slotType="mainAndBackPack" stopAt={6} />;

  // Initialize utility for manage data in component
  const prrUtility = PlayerRowUtility.getInstance();

  // Create an Array<string> of items in main slot
  prrUtility.setItems(itemDetails, 'main_slot');
  const items = prrUtility.m_Items;

  return (
    <>
      {items.map((item: string, idx: number) => {
        //
        // Get details about Current Item
        const details = prrUtility.findDetailsAboutCurrentItem('item', item, itemDetails, player);

        // Function to update the toolTipStatus when mouse enter
        const handleMouseEnter = () =>
          prrUtility.handleMouseEnter(item, 'main_slot', idx, setToolTipStatus);

        // Function to update the toolTipStatus when mouse leave
        const handleMouseLeave = () =>
          prrUtility.handleMouseLeave('main_slot', idx, setToolTipStatus);

        return (
          <div key={idx} className={styles.mainAndBackpackItemWrapper}>
            {toolTipStatus[idx] && <ItemDescription details={details} item={item} />}
            <Image
              src={
                item !== 'empty_slot'
                  ? `${process.env.NEXT_PUBLIC_ITEM_ICON_URL}${item}.png`
                  : '/pictures/dota-item-icons/empty-slot.webp'
              }
              alt={item}
              width={37}
              height={27}
              quality={100}
              unoptimized
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
            {item !== 'empty_slot' && details && (
              <span className={styles.purchaseTime}>{details[item].purchaseTime}</span>
            )}
          </div>
        );
      })}
    </>
  );
}
