'use client'

import Search from './Search'
import MatchDetails from './MatchDetails'
import DataLoader from '@/components/loaders/DataLoader'

import { useEffect } from '@/shared/reactImports'
import { useAppSelector, useAppDispatch } from '@/shared/reduxImports'
import {
  setDotaConstants,
  setIsTableDataExist,
  setMatchData,
  setTableLoading,
} from '@/store/statisticSlice'

import type { DotaConstants, MatchData } from '@/types/redux/statisticSlice'
import MatchHeader from './MatchHeader'

export default function Statistic({
  matchData,
  dotaConstantsData,
}: {
  matchData: MatchData | string
  dotaConstantsData: DotaConstants | string
}) {
  const { tableLoading, isTableDataExist, error } = useAppSelector((store) => store.statisticSlice)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setDotaConstants(dotaConstantsData))
  }, [])

  useEffect(() => {
    if (!isTableDataExist) {
      dispatch(setMatchData(matchData))

      const delay = async () => {
        dispatch(setTableLoading(false)) // activate loading
        await dataLoadingDelay(100)
        dispatch(setTableLoading(true)) // disable loading
      }

      delay()
    } else {
      const delay = async () => {
        dispatch(setTableLoading(false))
        await dataLoadingDelay(1500)
        dispatch(setTableLoading(true))
      }

      delay()
      dispatch(setIsTableDataExist(false))
    }
  }, [dispatch, matchData])

  if (error !== null) throw new Error(error) // Error handling

  return (
    <div style={{ width: '100%' }}>
      <Search />
      {tableLoading ? (
        <>
          <MatchHeader />
          <MatchDetails />
        </>
      ) : (
        <DataLoader />
      )}
    </div>
  )
}

async function dataLoadingDelay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, ms)
  })
}
