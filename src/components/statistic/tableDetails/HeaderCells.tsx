import { ReactTooltip } from '@/shared/reactImports'

import styles from '@/styles/statistic/TableDetails.module.scss'

export default function HeaderCells() {
  return (
    <>
      <TableHeaderCell str={'PLAYER'} title={''} />
      <TableHeaderCell str={'K'} title={'Hero Kills'} styleFlag='kda' />
      <TableHeaderCell str={'D'} title={'Hero Deaths'} styleFlag='kda' />
      <TableHeaderCell str={'A'} title={'Hero Assists'} styleFlag='kda' />
      <TableHeaderCell
        str={'LH'}
        title={'Number of creeps killed by hero'}
        styleFlag='lhDnGpmXpm'
      />
      <TableHeaderCell
        str={'DN'}
        title={'Number of creeps denied by hero'}
        styleFlag='lhDnGpmXpm'
      />
      <TableHeaderCell str={'NET'} title={'Net Worth'} styleFlag='netHdTdHh' />
      <TableHeaderCell str={'GPM'} title={'Gold Per Minute'} styleFlag='lhDnGpmXpm' />
      <TableHeaderCell str={'XPM'} title={'Experience Per Minute'} styleFlag='lhDnGpmXpm' />
      <TableHeaderCell str={'HD'} title={'Damage dealt to heroes'} styleFlag='netHdTdHh' />
      <TableHeaderCell str={'TD'} title={'Damage dealt to buildings'} styleFlag='netHdTdHh' />
      <TableHeaderCell str={'HH'} title={'Health restored to heroes'} styleFlag='netHdTdHh' />
      <TableHeaderCell str={'ITEMS'} title={'Items built'} />
    </>
  )
}

function TableHeaderCell({
  str,
  title,
  styleFlag,
}: {
  str: string
  title: string
  styleFlag?: string
}) {
  return (
    <th
      data-tooltip-id={str}
      // className styleFlags:
      // - kda stands for Kills, Deaths, Assists.
      // - lhDhGpmXpm stands for Last hit, Denied,
      // Gold Per Minute, Experience Per Minute.
      // - netHdTdHh stands for Net Worh, Hero Damage,
      // Tower Damage, Health restored to Heroes.
      className={`${styleFlag === 'kda' && styles.kda} ${
        styleFlag === 'lhDnGpmXpm' && styles.lhDnGpmXpm
      } ${styleFlag === 'netHdTdHh' && styles.netHdTdHh}`}
    >
      {str}
      <ReactTooltip
        id={str}
        content={title}
        place='top'
        style={{ color: '#ffffffde', background: '#242f39' }}
      />
    </th>
  )
}
