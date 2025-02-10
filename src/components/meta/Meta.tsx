'use client'

import MetaHeader from './MetaHeader'
import MetaPublic from './MetaPublic'

import { useState } from '@/shared/reactImports'

import type { MetaData } from '@/types/meta/metaData'

import styles from '@/styles/meta/Meta.module.scss'

export default function Meta({ metaData }: { metaData: MetaData | string }) {
  const [isPub, setIsPub] = useState(true)
  const [currRank, setCurrRank] = useState(8)
  const [tableSort, setTableSort] = useState({ winrate: true, pick: false })

  if (typeof metaData === 'string') throw new Error(metaData)

  const { heroStatsData } = metaData

  const handleButtonClick = (condition: boolean) => () => {
    setIsPub(condition)
  }

  return (
    <div className={styles.meta}>
      <div className={styles.meta__categories}>
        <button
          style={{ borderBottom: isPub ? '1.5px solid #ffffffde' : undefined }}
          onClick={handleButtonClick(true)}
        >
          <h3>public</h3>
        </button>
        <button
          style={{ borderBottom: !isPub ? '1.5px solid #ffffffde' : undefined }}
          onClick={handleButtonClick(false)}
        >
          <h3>professional</h3>
        </button>
      </div>

      {isPub && <MetaHeader currRank={currRank} setCurrRank={setCurrRank} />}
      <table className={styles.metaTable}>
        <thead>
          <tr>
            <th>hero</th>
            <th>winrate</th>
            <th>
              <div style={{ width: 'max-content' }}>matches played</div>
            </th>
          </tr>
        </thead>
        <tbody>{isPub && <MetaPublic currRank={currRank} heroStats={heroStatsData} />}</tbody>
      </table>
    </div>
  )
}
