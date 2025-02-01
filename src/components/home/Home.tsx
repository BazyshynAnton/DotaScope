'use client'

import HomeContent from './HomeContent'

import { useAppDispatch, useAppSelector } from '@/shared/reduxImports'
import { useEffect } from '@/shared/reactImports'
import { setHomeData } from '@/store/homeSlice'

import type { HomeData } from '@/types/home/homeData'

import styles from '@/styles/home/Home.module.scss'

export default function Home({ homeData }: { homeData: HomeData | string }) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setHomeData(homeData))
  })

  return (
    <div className={styles.homeWrapper}>
      <HomeContent />
    </div>
  )
}
