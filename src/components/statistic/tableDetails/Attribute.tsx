import type { ItemDescriptionInterface } from '@/types/statistic/playerRow'

import styles from '@/styles/statistic/ItemDescription.module.scss'

export default function Attribute({ details, item }: ItemDescriptionInterface) {
  if (!details) {
    throw Error('[DATA] Cannot get data about Item Details')
  }

  return (
    <div className={styles.attrib}>
      {details[item].attrib?.map((att) => {
        if (!att.display) return

        // Erase {value} from string
        const partsOfString = att.display.split('{value}')

        return (
          <div key={att.key} className={styles.attrib__text}>
            <div>{partsOfString[0]}</div>
            <div style={{ color: '#ffffffde' }}>{att.value}</div>
            <div>{partsOfString[1]}</div>
          </div>
        )
      })}
    </div>
  )
}
