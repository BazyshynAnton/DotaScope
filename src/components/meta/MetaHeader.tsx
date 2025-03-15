import { Image } from '@/shared/nextjs-imports';
import { Dispatch, SetStateAction } from 'react';

import styles from '@/styles/meta/meta.module.scss';

const ranks = [
  process.env.NEXT_PUBLIC_1_RANK_ICON_URL as string,
  process.env.NEXT_PUBLIC_2_RANK_ICON_URL as string,
  process.env.NEXT_PUBLIC_3_RANK_ICON_URL as string,
  process.env.NEXT_PUBLIC_4_RANK_ICON_URL as string,
  process.env.NEXT_PUBLIC_5_RANK_ICON_URL as string,
  process.env.NEXT_PUBLIC_6_RANK_ICON_URL as string,
  process.env.NEXT_PUBLIC_7_RANK_ICON_URL as string,
  process.env.NEXT_PUBLIC_8_RANK_ICON_URL as string,
];

export default function MetaHeader({
  currRank,
  setCurrRank,
}: {
  currRank: number;
  setCurrRank: Dispatch<SetStateAction<number>>;
}) {
  const handleImageClick = (rankNumber: number) => () => {
    setCurrRank(rankNumber);
  };

  return (
    <div className={styles.metaHeader}>
      {ranks.map((rank, idx) => (
        <Image
          key={rank}
          src={rank}
          alt={`rank${idx + 1}`}
          width={70}
          height={70}
          style={{ filter: currRank !== idx + 1 ? 'grayscale(100%) brightness(70%)' : undefined }}
          onClick={handleImageClick(idx + 1)}
        />
      ))}
    </div>
  );
}
