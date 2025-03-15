import ItemDescription from './ItemDescription';
import CannotFind from './CannotFind';

import { Image } from '@/shared/nextjs-imports';
import { React, useState } from '@/shared/react-imports';
import { PlayerRowUtility } from '@/utils/statistic/player-row-utility';

import type { SlotInterface } from '@/types/statistic/player-row';

export default function NeutralItem({ itemDetails }: SlotInterface) {
  //
  // State for manage tooltip about neutral item.
  const [toolTipStatus, setToolTipStatus] = useState(false);

  if (!itemDetails?.item_neutral.name) return <CannotFind />;

  // Initialize neutral item
  const neutralItem: string = itemDetails.item_neutral.name;

  // Initialize utility for manage data in component
  const prrUtility = PlayerRowUtility.getInstance();

  // Get details about Current Neutral Item
  const details = prrUtility.findDetailsAboutCurrentItem('item', neutralItem, itemDetails);

  // Function to update the toolTipStatus when mouse enter
  const handleMouseEnter = () => {
    prrUtility.handleMouseEnter(neutralItem, 'neutral_slot', -1, setToolTipStatus);
  };

  // Function to update the toolTipStatus when mouse leave
  const handleMouseLeave = () => {
    prrUtility.handleMouseLeave('neutral_slot', -1, setToolTipStatus);
  };

  return (
    <React.Fragment>
      {toolTipStatus && <ItemDescription details={details} item={neutralItem} />}
      <Image
        src={
          neutralItem !== 'empty_slot'
            ? `${process.env.NEXT_PUBLIC_ITEM_ICON_URL}${neutralItem}.png`
            : 'pictures/dotaItemIcons/empty_slot.webp'
        }
        alt=""
        width={39}
        height={32}
        quality={100}
        unoptimized
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </React.Fragment>
  );
}
