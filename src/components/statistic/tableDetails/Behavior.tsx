import type { ItemDescriptionInterface } from '@/types/statistic/playerRow'

import styles from '@/styles/statistic/ItemDescription.module.scss'

export default function Behavior({ details, item }: ItemDescriptionInterface) {
  //
  // Check for existence
  if (!details) {
    throw Error('[DATA] Cannot get data about Item Details')
  }

  // Formatting string to get the result like that:
  // [example] -> Point Target / AOE
  let target: string = ''
  if (Array.isArray(details[item].behavior)) {
    details[item].behavior.forEach((str, idx) => {
      if (idx !== (details[item].behavior as string[]).length - 1) {
        target += str + ' / '
      } else {
        target += str
      }
    })
  } else if (typeof details[item].behavior === 'string') target = details[item].behavior

  const dispellableCondition =
    details[item].dispellable === 'Yes' ? styles.dispellable_typeOne : styles.dispellable_typeTwo

  const bkbpierceCondition =
    details[item].bkbpierce === 'Yes'
      ? styles.piercesDebuffImmunity_typeOne
      : styles.piercesDebuffImmunity_typeTwo

  return (
    <>
      {details[item].behavior && (
        <div className={styles.target}>
          <div>TARGET:</div>
          <div style={{ color: '#ffffffde' }}> {target}</div>
        </div>
      )}
      {details[item].dispellable && (
        <div className={styles.dispellable}>
          <div>DISPELLABLE:</div>
          <div className={dispellableCondition}> {details[item].dispellable}</div>
        </div>
      )}
      {details[item].bkbpierce && (
        <div className={styles.piercesDebuffImmunity}>
          <div>PIERCES DEBUFF IMMUNITY:</div>
          <div className={bkbpierceCondition}> {details[item].bkbpierce}</div>
        </div>
      )}
      {details[item].behavior && details[item].dispellable && details[item].bkbpierce && (
        <hr
          style={{
            width: '100%',
            height: '1.5px',
            background: '#6c7b7e',
            border: 'none',
            margin: '18px 0px 13px 0px',
          }}
        />
      )}
    </>
  )
}
