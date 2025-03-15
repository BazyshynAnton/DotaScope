import { Image } from '@/shared/nextjs-imports';

import type { ItemDescriptionInterface } from '@/types/statistic/player-row';

import styles from '@/styles/statistic/item-description.module.scss';

export default function Tier({ details, item }: ItemDescriptionInterface) {
  if (!details) {
    throw new Error('[DATA] Cannot get data about Item Details');
  }

  return (
    <>
      {details[item].tier ? (
        <div className={styles.nameAndCostWrapper__nameAndCost__tier}>
          <div>Tier {details[item].tier} Neutral Item</div>
        </div>
      ) : (
        <div className={styles.nameAndCostWrapper__nameAndCost__cost}>
          <Image src={`/pictures/dota-icons/gold-symbol.webp`} alt="gold" width={20} height={20} />
          <div>{details[item].cost}</div>
        </div>
      )}
    </>
  );
}
