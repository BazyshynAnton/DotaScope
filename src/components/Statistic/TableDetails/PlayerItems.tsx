import Aghanim from './Aghanim';
import BackpackItems from './BackpackItems';
import MainSlotItems from './MainSlotItems';
import NeutralItem from './NeutralItem';

import type { Player } from '@/types/statistic/match-data';
import type { ItemDetails } from '@/types/statistic/player-row';

import styles from '@/styles/statistic/player-row.module.scss';

export default function PlayerItems({
  itemDetails,
  player,
}: {
  itemDetails: ItemDetails | null;
  player: Player;
}) {
  return (
    <td className={styles.playerDataCell__items}>
      <div className={styles.playerDataCell__items__wrapper}>
        <div className={styles.slots}>
          <div className={styles.slots__mainSlot}>
            <MainSlotItems itemDetails={itemDetails} player={player} />
          </div>
          <div className={styles.slots__backpack}>
            <BackpackItems itemDetails={itemDetails} player={player} />
          </div>
        </div>
        <div className={styles.neutral}>
          <NeutralItem itemDetails={itemDetails} />
        </div>
        <div className={styles.aghanim}>
          <Aghanim player={player} />
        </div>
      </div>
    </td>
  );
}
