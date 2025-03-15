import { Image } from '@/shared/nextjs-imports';

import styles from '@/styles/statistic/player-row.module.scss';

export default function CannotFind({ slotType, stopAt }: { slotType: string; stopAt: number }) {
  return (
    <>
      {[0, 1, 2, 3, 4, 5].map((_, idx) => {
        if (idx < stopAt)
          return (
            <>
              {slotType === 'mainAndBackPack' ? (
                <div className={styles.mainAndBackpackItemWrapper}>
                  <Image
                    src={'pictures/dota-item-icons/empty-slot.webp'}
                    alt="empty slot"
                    width={37}
                    height={27}
                    quality={100}
                    unoptimized
                  />
                </div>
              ) : (
                <Image
                  src={'pictures/dota-item-icons/empty-slot.webp'}
                  alt="empty slot"
                  width={39}
                  height={32}
                  quality={100}
                  unoptimized
                />
              )}
            </>
          );
      })}
    </>
  );
}
