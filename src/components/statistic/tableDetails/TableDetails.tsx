import PlayerRow from './PlayerRow'
import HeaderCells from './HeaderCells'

import { useAppSelector } from '@/hooks/useAppSelector'

import type { Player } from '@/types/statistic/matchData'

import styles from '@/styles/statistic/TableDetails.module.scss'

export default function TableDetails({ playersTeam }: { playersTeam: Player[] }) {
  const { matchDetails } = useAppSelector((store) => store.statisticSlice)

  const teamHeaderCondition = playersTeam[0].isRadiant
    ? styles.result__team__header_radiant
    : styles.result__team__header_dire

  const side = playersTeam[0].isRadiant ? 'radiant' : 'dire'

  let teamName
  switch (side) {
    case 'radiant': {
      teamName = matchDetails?.radiant_name ? matchDetails.radiant_name : `the ${side}`
      break
    }
    case 'dire': {
      teamName = matchDetails?.dire_name ? matchDetails.dire_name : `the ${side}`
      break
    }
  }

  if (teamName === '') teamName = 'TBD'

  return (
    <div className={styles.result}>
      <section className={styles.result__team}>
        <h4 className={`${styles.result__team__header} ${teamHeaderCondition}`}>{teamName}</h4>
        <article className={styles.result__team__tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.table__thead}>
              <tr className={styles.table__thead__headersTableRow}>
                <HeaderCells />
              </tr>
            </thead>
            <tbody>
              <PlayerRow playersTeam={playersTeam} />
            </tbody>
          </table>
        </article>
      </section>
    </div>
  )
}
