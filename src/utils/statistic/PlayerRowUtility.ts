import type { ItemDetails, UPlayerRow } from '@/types/statistic/playerRow'
import type { Player } from '@/types/statistic/matchData'

const enum slotSizes {
  Main = 6,
  Backpack = 3,
}

/**
 * PlayerRowUtility is an class that uses for setting
 * information in row within `PlayerRowReusable.tsx`.
 *
 * Implements the Singleton pattern.
 *
 * @class
 * @constructor Default.
 * @implements {UPlayerRow}
 */
export class PlayerRowUtility implements UPlayerRow {
  /**
   * Retrieves the singleton instance of the PlayerRowUtility class.
   * If an instance does not exist, it creates one.
   *
   * @returns {PlayerRowUtility} The singleton instance of the class.
   */
  public static getInstance() {
    if (!PlayerRowUtility.instance) {
      PlayerRowUtility.instance = new PlayerRowUtility()
    }
    return PlayerRowUtility.instance
  }

  // Array<string> for items
  public m_Items: string[] = []

  /**
   * Creates an Array<string> of items for appropriate slot.
   *
   * @param detailsAboutItems Data about items.
   * @param slotType Type of slot { `main_slot`, `backpack` }
   */
  public setItems(detailsAboutItems: ItemDetails, slotType: string) {
    this.m_Items = []

    switch (slotType) {
      case 'main_slot': {
        for (let i = 0; i < slotSizes.Main; ++i) {
          const icon = detailsAboutItems[`item_${i}`]?.img
          if (typeof icon === 'string') {
            this.m_Items.push(icon)
          }
        }
        break
      }
      case 'backpack': {
        for (let i = 0; i < slotSizes.Backpack; ++i) {
          const icon = detailsAboutItems[`backpack_${i}`]?.img
          if (typeof icon === 'string') {
            this.m_Items.push(icon)
          }
        }
        break
      }
      default:
        break
    }
  }

  public handleMouseEnter(item: string, slotType: string, idx?: number | string, setter?: any) {
    switch (slotType) {
      case 'main_slot':
      case 'backpack': {
        if (item === 'empty_slot' || idx === undefined) return

        idx.toString()
        setter((prevState: any) => {
          const newState = { ...prevState, [idx]: true }

          return newState
        })

        break
      }
      case 'neutral_slot': {
        if (item === 'empty_slot') return

        setter(true)

        break
      }
      case 'aghanim_slot': {
        if (idx === undefined) return

        setter((prevState: any) => {
          const newState = { ...prevState, [idx]: true }
          return newState
        })

        break
      }
      default:
        break
    }
  }

  public handleMouseLeave(slotType: string, idx?: number | string, setter?: any) {
    switch (slotType) {
      case 'main_slot':
      case 'backpack': {
        if (idx === undefined) return

        idx.toString()
        setter((prevState: any) => {
          const newState = { ...prevState, [idx]: false }

          return newState
        })

        break
      }
      case 'neutral_slot': {
        setter(false)
        break
      }
      case 'aghanim_slot': {
        if (idx === undefined) return

        setter((prevState: any) => {
          const newState = { ...prevState, [idx]: false }
          return newState
        })

        break
      }
      default:
        break
    }
  }

  /**
   * Finds details about a specified item based on the
   * provided flag and item identifier.
   *
   * @param {string} flag Specifies the type of search.
   * @param {string} item The identifier of the item to search for.
   * @param {ItemDetails} [detailsAboutItems] Item details, required when flag is "item".
   * @returns {ItemDetails | null} Returns the details of the specified item if found, otherwise null.
   */
  public findDetailsAboutCurrentItem(
    flag: string,
    item: string,
    detailsAboutItems?: ItemDetails,
    player?: Player,
  ): ItemDetails | null {
    switch (flag) {
      case 'item': {
        if (detailsAboutItems) {
          const res: ItemDetails = {}

          for (const [_, value] of Object.entries(detailsAboutItems)) {
            if (item === value.img) {
              res[item] = value
              break
            }
          }

          if (typeof player?.purchase_log !== 'undefined') {
            player.purchase_log.some((purchase) => {
              if (item === purchase.key) {
                let minutes = Math.floor(purchase.time / 60)
                let seconds = purchase.time % 60

                if (minutes < 0 && seconds < 0) {
                  minutes = -1
                  seconds *= -1
                }

                res[item].purchaseTime = `${minutes}:${seconds.toString().padStart(2, '0')}`
                return true // breaking the loop
              }
            })
          }

          return res
        }
      }
      case 'aghanim': {
        if (item === 'ultimate_scepter') {
          return this.mUltimateScepter
        }

        if (item === 'aghanims_shard') {
          return this.mAghanimsShard
        }
        break
      }
    }

    return null
  }

  // Private section below:
  //
  private static instance: PlayerRowUtility
  private constructor() {}

  // Constant for "ultimate_scepter" item
  private mUltimateScepter: ItemDetails = {
    ultimate_scepter: {
      abilities: [
        {
          type: 'passive',
          title: 'Ability Upgrade',
          description: 'Upgrades the ultimate, and some abilities, of all heroes.',
        },
      ],
      hint: [],
      id: 108,
      img: 'ultimate_scepter',
      dname: "Aghanim's Scepter",
      cost: 4200,
      attrib: [
        {
          key: 'bonus_all_stats',
          display: '+ {value} All Attributes',
          value: '10',
        },
        {
          key: 'bonus_health',
          display: '+ {value} Health',
          value: '175',
        },
        {
          key: 'bonus_mana',
          display: '+ {value} Mana',
          value: '175',
        },
      ],
      mc: false,
      cd: false,
      lore: 'The scepter of a wizard with demigod-like powers.',
      components: ['point_booster', 'staff_of_wizardry', 'ogre_axe', 'blade_of_alacrity'],
    },
  }

  // Constant for "aghanims_shard" item
  private mAghanimsShard: ItemDetails = {
    aghanims_shard: {
      abilities: [
        {
          type: 'passive',
          title: 'Ability Upgrade',
          description: 'Upgrades an existing ability or adds a new ability to your hero.',
        },
      ],
      hint: [],
      id: 609,
      img: 'aghanims_shard',
      dname: "Aghanim's Shard",
      cost: 1400,
      attrib: [],
      mc: false,
      cd: false,
      lore: 'With origins known only to a single wizard, fragments of this impossible crystal are nearly as coveted as the renowned scepter itself.',
      components: null,
    },
  }
}
