'use client';

import HomeContent from './HomeContent';

import { useAppDispatch, useAppSelector } from '@/shared/redux-imports';
import { useEffect } from '@/shared/react-imports';
import { setHomeData } from '@/store/home-slice';

import type { HomeData } from '@/types/home/home-data';

import styles from '@/styles/home/home.module.scss';

export default function Home({ homeData }: { homeData: HomeData | string }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setHomeData(homeData));
  });

  return (
    <div className={styles.homeWrapper}>
      <HomeContent />
    </div>
  );
}
