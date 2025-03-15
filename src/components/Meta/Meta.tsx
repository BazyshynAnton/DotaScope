'use client';

import MetaHeader from './MetaHeader';
import MetaPublic from './MetaPublic';
import MetaPro from './MetaPro';

import { useState } from '@/shared/react-imports';

import { TbSortAscending } from 'react-icons/tb';
import { TbSortDescending } from 'react-icons/tb';

import type { HeroStats, MetaData, TableSort } from '@/types/meta/meta-data';

import styles from '@/styles/meta/meta.module.scss';

export default function Meta({ metaData }: { metaData: MetaData | string }) {
  const [isPub, setIsPub] = useState(true);
  const [currRank, setCurrRank] = useState(8);

  // true - ascending  , false - descending
  const [tableSort, setTableSort] = useState<TableSort>({ keyToSort: 'winrate', direction: false });

  if (typeof metaData === 'string') throw new Error(metaData);

  const { heroStatsData } = metaData;

  const handlePubClick = (condition: boolean) => () => {
    setIsPub(condition);
  };

  const handleTableSortClick = (keyToSort: string) => () => {
    setTableSort({
      keyToSort,
      direction:
        keyToSort === tableSort.keyToSort ? (tableSort.direction === false ? true : false) : false,
    });
  };

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
      <p style={{ marginBottom: '12px' }}>Meta for the last 7 days</p>
      {isPub && <MetaHeader currRank={currRank} setCurrRank={setCurrRank} />}
      <div className={styles.tableWrapper}>
        <table className={styles.metaTable}>
          <thead>
            <tr>
              <th>hero</th>
              <th onClick={handleTableSortClick('winrate')}>
                <div style={{ width: '80px', ...tableHeaderCellStyles }}>
                  winrate
                  <SortType keyToSort="winrate" tableSort={tableSort} />
                </div>
              </th>
              <th onClick={handleTableSortClick('matchesPlayed')}>
                <div style={{ width: '104px', ...tableHeaderCellStyles }}>
                  matches played
                  <SortType keyToSort="matchesPlayed" tableSort={tableSort} />
                </div>
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
  );
}

function SortType({ keyToSort, tableSort }: { keyToSort: string; tableSort: TableSort }) {
  return (
    <>
      {keyToSort === tableSort.keyToSort ? (
        tableSort.direction ? (
          <TbSortAscending />
        ) : (
          <TbSortDescending />
        )
      ) : (
        <></>
      )}
    </>
  );
}

export function sortHeroes(
  heroStats: HeroStats[],
  data: { win: keyof HeroStats; pick: keyof HeroStats },
  condition: TableSort
) {
  const { win, pick } = data;

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
            );
          } else if (condition.keyToSort === 'matchesPlayed') {
            return (a[pick] as number) - (b[pick] as number);
          }
        }
        //descending sort
        case false: {
          if (condition.keyToSort === 'winrate') {
            return (
              ((b[win] as number) / (b[pick] as number)) * 100 -
              ((a[win] as number) / (a[pick] as number)) * 100
            );
          } else if (condition.keyToSort === 'matchesPlayed') {
            return (b[pick] as number) - (a[pick] as number);
          }
        }
        default:
          return 0;
      }
    });
}

const tableHeaderCellStyles: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: 'max-content',
};
