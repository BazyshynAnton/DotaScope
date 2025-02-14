import { ReactTooltip } from '@/shared/reactImports'

import styles from '@/styles/statistic/TableAbilities.module.scss'

export default function HeaderCells() {
  const levels = new Array(25).fill(0)

  return (
    <tr className={styles.tableHeadRow}>
      <TableHeaderCell str='Hero' title='Hero' />
      {levels.map((_, idx) => (
        <TableHeaderCell key={idx} str={String(idx + 1)} title={'Hero level'} />
      ))}
    </tr>
  )
}

function TableHeaderCell({ str, title }: { str: string; title: string }) {
  return (
    <th data-tooltip-id={str}>
      {str}
      {str !== 'Hero' && (
        <ReactTooltip
          id={str}
          content={title + ' - ' + str}
          style={{ backgroundColor: '#5e5e5e' }}
        />
      )}
    </th>
  )
}
