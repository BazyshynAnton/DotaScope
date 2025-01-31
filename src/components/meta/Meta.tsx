'use client'

import { useEffect } from '@/shared/reactImports'
import { useAppDispatch, useAppSelector } from '@/shared/reduxImports'
import { setMetaData } from '@/store/metaSlice'

import type { MetaData } from '@/types/meta/metaDataUtility'

import styles from '@/styles/meta/Meta.module.scss'
import MetaHeader from './MetaHeader'

export default function Meta({ metaData }: { metaData: MetaData | string }) {
  const { error } = useAppSelector((store) => store.metaSlice)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setMetaData(metaData))
  }, [])

  if (typeof error === 'string') throw new Error(error)

  return (
    <div className={styles.meta}>
      <MetaHeader />
    </div>
  )
}
