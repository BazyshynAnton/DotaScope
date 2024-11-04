import AbilityDescription from "./abilityDescription/AbilityDescription"

import { AbilityDetailsUtility } from "@/utils/statistic/AbilityDetailsUtility"
import { Image } from "@/shared/nextjsImports"
import { useEffect, useState, useRef } from "@/shared/reactImports"

import { HERO_ABILITY_URL } from "@/utils/urls"

import type { Player } from "@/types/statistic/tableDetails"

import styles from "@/styles/statistic/TableAbilities.module.scss"

const isTooltipDefault = new Array<boolean>(25).fill(false)

export default function Abilities({ player }: { player: Player }) {
  const uAbilityDetails = AbilityDetailsUtility.getInstance()

  const [isTooltip, setIsTooltip] = useState<Array<boolean>>(isTooltipDefault)

  const tooltipRef = useRef<HTMLDivElement>(null)

  const abilityBuild = uAbilityDetails.setAbilityBuild(
    player.ability_upgrades_arr
  )

  const handleTrueClick = (idx: number) => () => {
    const updatedTooltip: Array<boolean> = JSON.parse(JSON.stringify(isTooltip))

    for (let i = 0; i < updatedTooltip.length; ++i) {
      if (i === idx) {
        updatedTooltip[i] = true
      } else {
        updatedTooltip[i] = false
      }
    }

    setIsTooltip(updatedTooltip)
  }

  const handleFalseClick = () => {
    setIsTooltip(isTooltipDefault)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        handleFalseClick()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <>
      {abilityBuild.map((ability, idx) => {
        const abilityName = uAbilityDetails.findAbilityByID(ability)

        const talentTree: boolean = abilityName.includes("special_bonus")

        return (
          <td key={idx} className={styles.tableBodyRow__abilityDataCell}>
            {abilityName !== "none" && (
              <div className={styles.abilityDataCell__inCell} ref={tooltipRef}>
                {isTooltip[idx] && (
                  <AbilityDescription abilityName={abilityName} />
                )}
                <Image
                  src={
                    !talentTree
                      ? `${HERO_ABILITY_URL}${abilityName}.png`
                      : "/pictures/dotaAbilityIcons/talent_tree.svg"
                  }
                  alt=""
                  width={100}
                  height={100}
                  onClick={handleTrueClick(idx)}
                />
              </div>
            )}
          </td>
        )
      })}
    </>
  )
}
