import ItemDescription from "../itemDescription/ItemDescription"
import CannotFind from "./CannotFind"

import { Image } from "@/shared/nextjsImports"
import { useState } from "@/shared/reactImports"

import { PlayerRowUtility } from "@/utils/statistic/PlayerRowUtility"

import type { SlotInterface } from "@/types/statistic/playerRow"

// Initial State for useState in BackpackItems component.
const initialStateBackpack = {
  0: false,
  1: false,
  2: false,
}

export default function BackpackItems({ itemDetails }: SlotInterface) {
  //
  // State for manage tooltip about each item.
  const [toolTipStatus, setToolTipStatus] = useState<{
    [idx: string]: boolean
  }>(initialStateBackpack)

  // Check data
  if (!itemDetails) return <CannotFind />

  // Initialize utility for manage data in component
  const prrUtility = new PlayerRowUtility()

  // Create an Array<string> of items in main slot
  prrUtility.setItems(itemDetails, "backpack")
  const items = prrUtility.m_Items

  return (
    <>
      {items.map((item: string, idx: number) => {
        //
        // Get details about Current Item
        const details = prrUtility.findDetailsAboutCurrentItem(
          "item",
          item,
          itemDetails
        )

        // Function to update the toolTipStatus when mouse enter
        const handleMouseEnter = () =>
          prrUtility.handleMouseEnter(item, "backpack", idx, setToolTipStatus)

        // Function to update the toolTipStatus when mouse leave
        const handleMouseLeave = () =>
          prrUtility.handleMouseLeave("backpack", idx, setToolTipStatus)

        return (
          <div key={idx}>
            {toolTipStatus[idx] && (
              <ItemDescription details={details} item={item} />
            )}
            <Image
              src={`/pictures/dotaItemIcon/${item}.webp`}
              alt=""
              width={37}
              height={27}
              quality={100}
              unoptimized
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </div>
        )
      })}
    </>
  )
}