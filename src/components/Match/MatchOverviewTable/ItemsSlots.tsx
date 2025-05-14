import TooltipItem from './TooltipItem';

import { Image } from '@/shared/nextjs-imports';
import { React, useState } from '@/shared/react-imports';
import { MatchOverview, PlayerItemCategory, SlotsType } from '@/utils/match-overview';

import styles from '@/styles/match-overview-table-content.module.scss';

export default function ItemsSlots({
  slotsType,
  player,
  playerItems,
}: {
  slotsType: SlotsType;
  player: Player;
  playerItems: PlayerItem;
}) {
  let initialTooltipStatusState = null;
  switch (slotsType) {
    case SlotsType.Main: {
      initialTooltipStatusState = {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
      };
      break;
    }
    case SlotsType.Backpack: {
      initialTooltipStatusState = {
        0: false,
        1: false,
        2: false,
      };
      break;
    }
    case SlotsType.Neutral: {
      initialTooltipStatusState = false;
      break;
    }
  }

  const [tooltipStatus, setTooltipStatus] = useState(initialTooltipStatusState);

  if (!playerItems) return;

  const matchOverview = MatchOverview.getInstance();

  let itemNames: string[] = [];
  switch (slotsType) {
    case SlotsType.Main: {
      itemNames = matchOverview.findItemNames(SlotsType.Main, playerItems);
      break;
    }
    case SlotsType.Backpack: {
      itemNames = matchOverview.findItemNames(SlotsType.Backpack, playerItems);
      break;
    }
    case SlotsType.Neutral: {
      itemNames = [playerItems.item_neutral.name as string];
    }
  }

  return (
    <div
      className={`${slotsType !== SlotsType.Neutral ? styles.items__slots : styles.items__neutral}`}
    >
      {itemNames.map((itemName: string, idx: number) => {
        const playerItem = matchOverview.findPlayerItem(
          PlayerItemCategory.MainAndBackpack,
          itemName,
          playerItems,
          player
        );

        let handleMouseImageEnter = () => {};
        let handleMouseImageLeave = () => {};
        switch (slotsType) {
          case SlotsType.Main: {
            handleMouseImageEnter = () =>
              matchOverview.handleMouseItemEnter(SlotsType.Main, itemName, idx, setTooltipStatus);
            handleMouseImageLeave = () =>
              matchOverview.handleMouseItemLeave(SlotsType.Main, idx, setTooltipStatus);
            break;
          }
          case SlotsType.Backpack: {
            handleMouseImageEnter = () =>
              matchOverview.handleMouseItemEnter(
                SlotsType.Backpack,
                itemName,
                idx,
                setTooltipStatus
              );
            handleMouseImageLeave = () =>
              matchOverview.handleMouseItemLeave(SlotsType.Backpack, idx, setTooltipStatus);
            break;
          }
          case SlotsType.Neutral: {
            handleMouseImageEnter = () => {
              matchOverview.handleMouseItemEnter(SlotsType.Neutral, itemName, -1, setTooltipStatus);
            };
            handleMouseImageLeave = () => {
              matchOverview.handleMouseItemLeave(SlotsType.Neutral, -1, setTooltipStatus);
            };
            break;
          }
        }

        return (
          <React.Fragment key={idx}>
            <div data-tooltip-id="item" className={styles.items__item}>
              <Image
                src={
                  itemName !== 'empty_slot'
                    ? `${process.env.NEXT_PUBLIC_ITEM_ICON_URL}${itemName.includes('recipe') ? 'recipe' : itemName}.png`
                    : `${process.env.NEXT_PUBLIC_EMPTY_SLOT_ICON_LOCAL}`
                }
                alt={itemName}
                width={slotsType !== SlotsType.Neutral ? 37 : 39}
                height={slotsType !== SlotsType.Neutral ? 27 : 32}
                quality={100}
                onMouseEnter={handleMouseImageEnter}
                onMouseLeave={handleMouseImageLeave}
              />
              {slotsType !== SlotsType.Neutral && itemName !== 'empty_slot' && playerItem && (
                <span className={styles.items__purchaseTime}>
                  {playerItem[itemName].purchaseTime}
                </span>
              )}
            </div>
            {/* {tooltipStatus[idx] && <TooltipItem />} */}
          </React.Fragment>
        );
      })}
    </div>
  );
}
