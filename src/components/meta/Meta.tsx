'use client'

import MetaHeader from './MetaHeader'
import MetaPublic from './MetaPublic'

import { useState } from '@/shared/reactImports'

import type { HeroStats, MetaData } from '@/types/meta/metaData'

import styles from '@/styles/meta/Meta.module.scss'
import MetaPro from './MetaPro'

export default function Meta({ metaData }: { metaData: MetaData | string }) {
  const [isPub, setIsPub] = useState(true)
  const [currRank, setCurrRank] = useState(8)

  // true - ascending  , false - descending
  const [tableSort, setTableSort] = useState({ keyToSort: 'winrate', direction: false })

  if (typeof metaData === 'string') throw new Error(metaData)

  const { heroStatsData } = metaData

  const handlePubClick = (condition: boolean) => () => {
    setIsPub(condition)
  }

  const handleTableSortClick = (keyToSort: string, direction: boolean) => () => {
    setTableSort({
      keyToSort,
      direction:
        keyToSort === tableSort.keyToSort ? (tableSort.direction === false ? true : false) : false,
    })
  }

  return (
    <div className={styles.meta}>
      <div className={styles.meta__categories}>
        <button
          style={{ borderBottom: isPub ? '1.5px solid #ffffffde' : undefined }}
          onClick={handlePubClick(true)}
        >
          <h3>public</h3>
        </button>
        <button
          style={{ borderBottom: !isPub ? '1.5px solid #ffffffde' : undefined }}
          onClick={handlePubClick(false)}
        >
          <h3>professional</h3>
        </button>
      </div>
      {/* TODO: <div>{matchCountPro}</div> */}
      {isPub && <MetaHeader currRank={currRank} setCurrRank={setCurrRank} />}
      <div className={styles.tableWrapper}>
        <table className={styles.metaTable}>
          <thead>
            <tr>
              <th>hero</th>
              <th onClick={handleTableSortClick('winrate', false)}>winrate</th>
              <th onClick={handleTableSortClick('matchesPlayed', false)}>
                <div style={{ width: 'max-content' }}>matches played</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {isPub && (
              <MetaPublic currRank={currRank} heroStats={heroStatsData} tableSort={tableSort} />
            )}
            {!isPub && <MetaPro heroStats={heroStatsData} tableSort={tableSort} />}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function sortHeroes(
  heroStats: HeroStats[],
  data: { win: keyof HeroStats; pick: keyof HeroStats },
  condition: { keyToSort: string; direction: boolean },
) {
  const { win, pick } = data

  return heroStats
    .filter((hero) => (hero[pick] as number) > 0)
    .sort((a, b) => {
      switch (condition.direction) {
        // ascending sort
        case true: {
          if (condition.keyToSort === 'winrate') {
            return (
              ((a[win] as number) / (a[pick] as number)) * 100 -
              ((b[win] as number) / (b[pick] as number)) * 100
            )
          } else if (condition.keyToSort === 'matchesPlayed') {
            return (a[pick] as number) - (b[pick] as number)
          }
        }
        //descending sort
        case false: {
          if (condition.keyToSort === 'winrate') {
            return (
              ((b[win] as number) / (b[pick] as number)) * 100 -
              ((a[win] as number) / (a[pick] as number)) * 100
            )
          } else if (condition.keyToSort === 'matchesPlayed') {
            return (b[pick] as number) - (a[pick] as number)
          }
        }
        default:
          return 0
      }
    })
}
