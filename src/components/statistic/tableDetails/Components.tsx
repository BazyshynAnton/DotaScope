import { Image } from '@/shared/nextjsImports'
import { PlayerRowDetailsUtility } from '@/utils/statistic/PlayerRowDetailsUtility'
import { useAppSelector } from '@/hooks/useAppSelector'

import type { ItemDescriptionInterface } from '@/types/statistic/playerRow'

import styles from '@/styles/statistic/ItemDescription.module.scss'

export default function Components({ details, item }: ItemDescriptionInterface) {
  const { items } = useAppSelector((store) => store.statisticSlice)

  if (!details || !items) {
    throw Error('[DATA] Cannot get data about Item Details')
  }

  let recipe = null
  let recipeCost = null
  if (items[`recipe_${item}`] && items[`recipe_${item}`].cost) {
    recipe = 'recipe'
    recipeCost = items[`recipe_${item}`].cost
  }

  return (
    <>
      {details[item].components && details[item].components.length > 0 && (
        <div className={styles.components}>
          <div style={{ display: 'inline' }}>Components:</div>
          <div className={styles.components__items}>
            {details[item].components.map((component, idx) => {
              const rdUtility = new PlayerRowDetailsUtility()
              const itemCost = rdUtility.findItemCostByKey(component, items)

              return (
                <div key={idx} className={styles.components__items__item}>
                  <Image
                    src={
                      !component.includes('recipe')
                        ? `${process.env.NEXT_PUBLIC_ITEM_ICON_URL}${component}.png`
                        : `${process.env.NEXT_PUBLIC_ITEM_ICON_URL}recipe.png`
                    }
                    alt=''
                    width={34}
                    height={25}
                  />
                  <div>{itemCost}</div>
                </div>
              )
            })}
            {recipe && recipeCost && (
              <div className={styles.components__items__item}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_ITEM_ICON_URL}recipe.png`}
                  alt={recipe}
                  width={34}
                  height={25}
                />
                <div>{recipeCost}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
