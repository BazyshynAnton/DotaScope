import Tier from './Tier';

import { Image } from '@/shared/nextjs-imports';

import type { ItemDescriptionInterface } from '@/types/statistic/player-row';

import styles from '@/styles/statistic/item-description.module.scss';

export default function NameAndCost({ details, item }: ItemDescriptionInterface) {
  if (!details) {
    throw new Error('[DATA] Cannot get data about Item Details');
  }

  return (
    <div className={styles.nameAndCostWrapper}>
      <div className={styles.nameAndCostWrapper__itemPicture}>
        <Image
          src={`${process.env.NEXT_PUBLIC_ITEM_ICON_URL}${item.includes('recipe') ? 'recipe' : item}.png`}
          alt={item}
          width={90}
          height={70}
        />
      </div>
      <div className={styles.nameAndCostWrapper__nameAndCost}>
        <div className={styles.nameAndCostWrapper__nameAndCost__name}>
          <div>{details[item].dname}</div>
        </div>
        <Tier details={details} item={item} />
      </div>
    </div>
  );
}
