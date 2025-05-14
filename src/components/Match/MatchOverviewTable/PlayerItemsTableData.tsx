import ItemsSlots from './ItemsSlots';

import { SlotsType } from '@/utils/match-overview';

import styles from '@/styles/match-overview-table-content.module.scss';

export default function PlayerItemsTableData({
  player,
  playerItems,
}: {
  player: Player;
  playerItems: PlayerItem;
}) {
  return (
    <td className={styles.table__bodyCell}>
      <div className={styles.items}>
        <div className={styles.items__slotsWrapper}>
          <ItemsSlots slotsType={SlotsType.Main} player={player} playerItems={playerItems} />
          <ItemsSlots slotsType={SlotsType.Backpack} player={player} playerItems={playerItems} />
        </div>
        <ItemsSlots slotsType={SlotsType.Neutral} player={player} playerItems={playerItems} />
        {/* div aghanim */}
      </div>
    </td>
  );
}
