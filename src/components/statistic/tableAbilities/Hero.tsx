import Abilities from "./Abilities"

import { Player } from "@/types/statistic/tableDetails"
import { PlayerRowDetailsUtility } from "@/utils/statistic/PlayerRowDetailsUtility"
import { useAppSelector } from "@/shared/reduxImports"
import { Image } from "@/shared/nextjsImports"

import { HERO_ICON_URL } from "@/utils/urls"

import styles from "@/styles/statistic/TableAbilities.module.scss"

export default function Hero({ playersTeam }: { playersTeam: Player[] }) {
  const { heroList, playersProfiles } = useAppSelector(
    (store) => store.statisticSlice
  )
  //
  // Check existence
  if (!heroList || !playersProfiles) return

  const uRowDetails = new PlayerRowDetailsUtility()

  return (
    <>
      {playersTeam.map((player) => {
        const detailsAboutHero = uRowDetails.findAppropriateHero(
          player,
          heroList
        )
        return (
          <tr key={player.hero_id} className={styles.tableBodyRow}>
            <td>
              <div className={styles.heroDataCell}>
                <Image
                  src={`${HERO_ICON_URL}${detailsAboutHero.heroName}.png`}
                  alt={detailsAboutHero.heroLocalizedName}
                  width={51}
                  height={30}
                />
              </div>
            </td>
            <Abilities player={player} heroName={detailsAboutHero.heroName} />
          </tr>
        )
      })}
    </>
  )
}
