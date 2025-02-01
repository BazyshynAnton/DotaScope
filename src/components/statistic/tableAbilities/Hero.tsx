import Abilities from './Abilities'

import { Player } from '@/types/statistic/matchData'
import { PlayerRowDetailsUtility } from '@/utils/statistic/PlayerRowDetailsUtility'
import { useAppSelector } from '@/shared/reduxImports'
import { Image } from '@/shared/nextjsImports'

import styles from '@/styles/statistic/TableAbilities.module.scss'

export default function Hero({ playersTeam }: { playersTeam: Player[] }) {
  const { heroList, playersProfiles, heroAbilities } = useAppSelector(
    (store) => store.statisticSlice,
  )

  if (!heroList || !playersProfiles) return

  const uRowDetails = new PlayerRowDetailsUtility()

  return (
    <>
      {playersTeam.map((player) => {
        const detailsAboutHero = uRowDetails.findAppropriateHero(player, heroList, heroAbilities)
        return (
          <tr key={player.hero_id} className={styles.tableBodyRow}>
            <td>
              <div className={styles.heroDataCell}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_HERO_ICON_URL}${detailsAboutHero.heroName}.png`}
                  alt={detailsAboutHero.heroLocalizedName}
                  width={51}
                  height={30}
                />
              </div>
            </td>
            <Abilities player={player} />
          </tr>
        )
      })}
    </>
  )
}
