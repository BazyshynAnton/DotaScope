import type { Player } from '@/types/statistic/tableDetails'

import type { FacetGradientColor, PlayerColors } from '@/types/statistic/matchDetails'

import type { HeroList, PlayerProfile } from '@/types/redux/statisticSlice'

import type {
  DetailsAboutHero,
  DetailsAboutPlayer,
  Item,
  ItemDetails,
  UPlayerRowDetails,
} from '@/types/statistic/playerRow'

/**
 * PlayerRowDetailsUtility is an class that uses for setting
 * information in row within `TableDetails.tsx`.
 *
 *
 * @class
 * @constructor Default.
 * @implements {UPlayerRowDetails}
 */
export class PlayerRowDetailsUtility implements UPlayerRowDetails {
  /**
   * Finds and sets detailed information about a hero based on the player's data.
   *
   * This function fills the `mHeroDetails` object with detailed information
   * about the hero associated with the given player. It determines
   * the hero's name, localized name, appearance (icon, color, title,
   * and description), and the player's associated color.
   * It utilizes helper methods to set these details.
   *
   * @param {Player} player The player's data, including
   * information to identify the hero.
   * @param {HeroList[]} heroList The list of available heroes
   * with their details.
   * @param {any} heroAbilities The object of hero abilities.
   * @returns {DetailsAboutHero} The detailed information about the hero.
   */
  public findAppropriateHero(
    player: Player,
    heroList: HeroList[],
    heroAbilities: any,
  ): DetailsAboutHero {
    this.mHeroDetails = {
      heroName: '',
      heroLocalizedName: '',
      heroVariant: {
        icon: '',
        color: '',
        title: '',
        description: '',
      },
      playerColor: '',
    }

    this.findColor(player)

    this.findHeroName(player, heroList)

    this.findHeroFacet(player, heroAbilities)

    return this.mHeroDetails
  }

  /**
   * Finds and fills detailed information about
   * a player based on their account ID.
   *
   * This function searches for a player's profile
   * in the provided list of player profiles and sets
   * the player's details such as avatar, profile URL,
   * leaderboard rank, and rank tier into the `mPlayerDetails`
   * object. If the player is anonymous (without account ID),
   * no updates are made to `mPlayerDetails`.
   *
   * @param {Player} player The player object containing the account ID and other details.
   * @param {PlayerProfile[]} playersProfiles A list of player profiles retrieved from external sources.
   * @returns {DetailsAboutPlayer} The detailed information about the player.
   */
  public findAppropriatePlayer(
    player: Player,
    playersProfiles: PlayerProfile[],
  ): DetailsAboutPlayer {
    //
    // If player is not Anonymous -> find player data

    if ('account_id' in player) {
      playersProfiles.some((playerProfile) => {
        if ('profile' in playerProfile) {
          if (player.account_id === playerProfile.profile.account_id) {
            // avatar
            this.mPlayerDetails.profileInfo.avatar = playerProfile.profile.avatar

            // profile url
            this.mPlayerDetails.profileInfo.profileurl = playerProfile.profile.profileurl

            // rank
            this.mPlayerDetails.leaderboard_rank_info = playerProfile.leaderboard_rank

            // rank tier
            this.mPlayerDetails.rank_tier_info = playerProfile.rank_tier

            return true // break the loop
          }
        }
      })
    }

    return this.mPlayerDetails
  }

  /**
   * Finds the appropriate rank icon for a player
   * based on their leaderboard rank and/or rank tier information.
   *
   * The function constructs the file path to the player's rank icon, dynamically
   * adjusting based on leaderboard position and rank tier. If no valid rank data
   * is available, a default icon is returned.
   *
   * @returns {string} The file path to the player's rank icon.
   */
  public findPlayerRankIcon(): string {
    const imagePath = '/pictures/dotaPlayerRankIcons/'

    const leaderboardRank = this.mPlayerDetails.leaderboard_rank_info

    const rankTier = this.mPlayerDetails.rank_tier_info

    if (rankTier && leaderboardRank) {
      if (leaderboardRank <= 10 && leaderboardRank >= 1) {
        return `${imagePath}${rankTier + 2}.png`
      }

      if (leaderboardRank > 10 && leaderboardRank <= 100) {
        return `${imagePath}${rankTier + 1}.png`
      }

      if (leaderboardRank > 100) {
        return `${imagePath}${rankTier}.png`
      }
    }

    if (rankTier && !leaderboardRank) {
      return `${imagePath}${rankTier}.png`
    }

    return `${imagePath}00.png`
  }

  /**
   * Finds player's avatar.
   *
   * @returns {string} The player's avatar if finds, otherwise the file path to anonymous avatar.
   */
  public findPlayerAvatar(): string {
    const avatar = this.mPlayerDetails.profileInfo.avatar

    if (avatar !== '') return avatar

    return '/pictures/dotaPlayerIcons/anonymous.jpg'
  }

  /**
   * Finds player items and details about them in object.
   *
   * @param {Player} player The player's data.
   * @param {Item} items The object.
   * @returns {ItemDetails | null} The items and item details if found, otherwise `null`.
   */
  public findAppropriateItems(player: Player, items: Item): ItemDetails | null {
    const emptyValue = {
      abilities: [],
      hint: [],
      img: 'empty_slot',
      id: '',
      dname: 'Empty Slot',
      cost: null,
      attrib: [],
      behavior: undefined,
      bkbpierce: undefined,
      dispellable: undefined,
      mc: undefined,
      cd: undefined,
      lore: undefined,
      components: undefined,
      tier: undefined,
    }

    // use loop to init it
    this.mItemDetails = {
      item_0: emptyValue,
      item_1: emptyValue,
      item_2: emptyValue,
      item_3: emptyValue,
      item_4: emptyValue,
      item_5: emptyValue,

      backpack_0: emptyValue,
      backpack_1: emptyValue,
      backpack_2: emptyValue,

      item_neutral: emptyValue,

      aghanims_scepter: emptyValue,
      aghanims_shard: emptyValue,
    }

    for (const [key, value] of Object.entries(items)) {
      const itemValue = {
        abilities: value.abilities,
        hint: value.hint,
        img: key,
        id: value.id,
        dname: value.dname,
        cost: value.cost,
        attrib: value.attrib,
        behavior: value.behavior,
        bkbpierce: value.bkbpierce,
        dispellable: value.dispellable,
        mc: value.mc,
        cd: value.cd,
        lore: value.lore,
        components: value.components,
        tier: value.tier,
      }

      switch (value.id) {
        case player.item_0:
          this.mItemDetails['item_0'] = itemValue
          break

        case player.item_1:
          this.mItemDetails['item_1'] = itemValue
          break

        case player.item_2:
          this.mItemDetails['item_2'] = itemValue
          break

        case player.item_3:
          this.mItemDetails['item_3'] = itemValue
          break

        case player.item_4:
          this.mItemDetails['item_4'] = itemValue
          break
        case player.item_5:
          this.mItemDetails['item_5'] = itemValue
          break

        case player.backpack_0:
          this.mItemDetails['backpack_0'] = itemValue
          break

        case player.backpack_1:
          this.mItemDetails['backpack_1'] = itemValue
          break

        case player.backpack_2:
          this.mItemDetails['backpack_2'] = itemValue
          break

        case player.item_neutral:
          this.mItemDetails['item_neutral'] = itemValue

        default:
          break
      }
    }

    return this.mItemDetails
  }

  /**
   * Find item cost in object by key.
   * @param {string} key The key.
   * @param {Item} items The object.
   * @returns {string} Item cost.
   */
  public findItemCostByKey(key: string, items: Item): string {
    let cost = 0

    for (const [itemsKey, value] of Object.entries(items)) {
      if (key === itemsKey) {
        if (value.cost) cost = value.cost
      }
    }

    return cost.toString()
  }

  // Hero details
  private mHeroDetails: DetailsAboutHero = {
    heroName: '',
    heroLocalizedName: '',
    heroVariant: {
      icon: '',
      color: '',
      title: '',
      description: '',
    },
    playerColor: '',
  }

  // Player details
  private mPlayerDetails: DetailsAboutPlayer = {
    profileInfo: {
      avatar: '',
      profileurl: '',
    },
    rank_tier_info: null,
    leaderboard_rank_info: null,
  }

  // Player's item details
  private mItemDetails: ItemDetails | any = {}

  // Cache for current hero
  private mCurrentHero: string = ''

  // Player's slot colors
  private mPlayerColors: PlayerColors = {
    radiant: {
      team_number: 0,
      colors: {
        '0': '#3375ff',
        '1': '#66ffbf',
        '2': '#bf00bf',
        '3': '#f3f00b',
        '4': '#ff6b00',
      },
    },

    dire: {
      team_number: 1,
      colors: {
        '0': '#fe86c2',
        '1': '#a1b447',
        '2': '#65d9f7',
        '3': '#008321',
        '4': '#a46900',
      },
    },
  }

  // Hero facet gradient colors
  private mFacetGradientColor: FacetGradientColor = {
    colorRed0: 'linear-gradient(to right, #9F3C3C, #4A2040)',

    colorRed1: 'linear-gradient(to right, #954533, #452732)',

    colorRed2: 'linear-gradient(to right, #A3735E, #4F2A25)',

    colorYellow0: 'linear-gradient(to right, #C8A45C, #6F3D21)',

    colorYellow1: 'linear-gradient(to right, #C6A158, #604928)',

    colorYellow2: 'linear-gradient(to right, #CAC194, #433828)',

    colorYellow3: 'linear-gradient(to right, #C3A99A, #4D352B)',

    colorPurple0: 'linear-gradient(to right, #B57789, #412755)',

    colorPurple1: 'linear-gradient(to right, #9C70A4, #282752)',

    colorPurple2: 'linear-gradient(to right, #675CAE, #261C44)',

    colorBlue0: 'linear-gradient(to right, #727CB2, #342D5B)',

    colorBlue1: 'linear-gradient(to right, #547EA6, #2A385E)',

    colorBlue2: 'linear-gradient(to right, #6BAEBC, #135459)',

    colorBlue3: 'linear-gradient(to right, #94B5BA, #385B59)',

    colorGreen0: 'linear-gradient(to right, #A2B23E, #2D5A18)',
    colorGreen1: 'linear-gradient(to right, #7EC2B2, #29493A)',

    colorGreen2: 'linear-gradient(to right, #A2B23E, #2D5A18)',

    colorGreen3: 'linear-gradient(to right, #9A9F6A, #223824)',

    colorGreen4: 'linear-gradient(to right, #9FAD8E, #3F4129)',

    colorGray0: 'linear-gradient(to right, #565C61, #1B1B21)',

    colorGray1: 'linear-gradient(to right, #6A6D73, #29272C)',

    colorGray2: 'linear-gradient(to right, #95A9B1, #3E464F)',

    colorGray3: 'linear-gradient(to right, #ADB6BE, #4E5557)',
  }

  /**
   * Finds player's color.
   *
   * @param {Player} player The player's data.
   */
  private findColor(player: Player): void {
    if (player.team_number === this.mPlayerColors.radiant.team_number) {
      for (const [colorKey, colorValue] of Object.entries(this.mPlayerColors.radiant.colors)) {
        if (player.player_slot.toString() === colorKey) {
          this.mHeroDetails.playerColor = colorValue
        }
      }
    }

    if (player.team_number === this.mPlayerColors.dire.team_number) {
      for (const [colorKey, colorValue] of Object.entries(this.mPlayerColors.dire.colors)) {
        if (player.team_slot.toString() === colorKey) {
          this.mHeroDetails.playerColor = colorValue
        }
      }
    }
  }

  /**
   * Finds hero's name in array.
   *
   * @param {Player} player The player's data.
   * @param {HeroList[]} heroList The array.
   */
  private findHeroName(player: Player, heroList: HeroList[]): void {
    for (let i = 0; i < heroList.length; ++i) {
      const hero = heroList[i]

      if (player.hero_id === hero.id) {
        this.mHeroDetails.heroName = hero.name
        this.mHeroDetails.heroName = this.mHeroDetails.heroName.replace('npc_dota_hero_', '')
        this.mHeroDetails.heroLocalizedName = hero.localized_name
        this.mCurrentHero = hero.name
      }
    }
  }

  /**
   * Finds hero's facet in object.
   * @param {Player} player The player's data.
   * @param {any} heroAbilities The object.
   */
  private findHeroFacet(player: Player, heroAbilities: any): void {
    if (heroAbilities) {
      for (const [heroID, value] of Object.entries(heroAbilities)) {
        if (this.mCurrentHero === heroID) {
          switch (player.hero_variant) {
            case 1:
              this.setHeroFacet(value, 0)
              break

            case 2:
              this.setHeroFacet(value, 1)
              break

            case 3:
              this.setHeroFacet(value, 2)
              break

            case 4:
              this.setHeroFacet(value, 3)
              break

            case 5:
              this.setHeroFacet(value, 4)
              break

            default:
              break
          }
        }
      }
    }
  }

  /**
   * Sets hero's facet data.
   *
   * @param {any} value The hero's data.
   * @param {number} facetID The facet's ID.
   */
  private setHeroFacet(value: any, facetID: number): void {
    if (value.facets[facetID]) {
      this.mHeroDetails.heroVariant.icon = value.facets[facetID].icon

      let highLevelColor: string = value.facets[facetID].color
      let gradientId: number = value.facets[facetID].gradient_id
      this.mHeroDetails.heroVariant.color =
        this.mFacetGradientColor[`color${highLevelColor}${gradientId}`]

      this.mHeroDetails.heroVariant.title = value.facets[facetID].title
      this.mHeroDetails.heroVariant.description = value.facets[facetID].description
    }
  }
}
