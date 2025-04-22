import type {
  PlayerHero,
  PlayerItems,
  PlayerDetails,
  CMatchOverviewPlayerRow,
} from '@/types/match-overview-player-row';
import type {
  Hero,
  Items,
  Player,
  PlayerColors,
  PlayerProfile,
  FacetGradientColors,
} from '@/types/matches-page';

export class MatchOverviewPlayerRow implements CMatchOverviewPlayerRow {
  public findAppropriateHero(player: Player, heroes: Hero[], heroAbilities: any): PlayerHero {
    // reset
    this.mPlayerHero = {
      name: '',
      localizedName: '',
      heroVariant: {
        icon: '',
        color: '',
        colorSingle: '',
        title: '',
        description: '',
      },
      playerColor: '',
    };

    this.findColor(player);

    this.findHeroName(player, heroes);

    this.findHeroFacet(player, heroAbilities);

    return this.mPlayerHero;
  }

  public findAppropriatePlayer(player: Player, playersProfiles: PlayerProfile[]): PlayerDetails {
    //
    // If player is not Anonymous -> find player data
    if ('account_id' in player) {
      playersProfiles.some((playerProfile) => {
        if ('profile' in playerProfile) {
          if (player.account_id === playerProfile.profile.account_id) {
            // avatar
            this.mPlayerDetails.profileInfo.profilePicture = playerProfile.profile.avatar;

            // rank icon
            this.mPlayerDetails.profileInfo.rankIcon = this.findPlayerRankIcon();

            // profile url
            this.mPlayerDetails.profileInfo.profileUrl = playerProfile.profile.profileurl;

            // rank tier
            this.mPlayerDetails.rankTierInfo = playerProfile.rank_tier;

            // rank
            this.mPlayerDetails.leaderboardRankInfo = playerProfile.leaderboard_rank;

            return true; // break the loop
          }
        }
      });
    }

    return this.mPlayerDetails;
  }

  public findPlayerRankIcon(): string {
    const imagePath = '/pictures/dota-player-rank-icons/';

    const leaderboardRank = this.mPlayerDetails.leaderboardRankInfo;

    const rankTier = this.mPlayerDetails.rankTierInfo;

    if (rankTier && leaderboardRank) {
      if (leaderboardRank <= 10 && leaderboardRank >= 1) {
        return `${imagePath}${rankTier + 2}.png`;
      }

      if (leaderboardRank > 10 && leaderboardRank <= 100) {
        return `${imagePath}${rankTier + 1}.png`;
      }

      if (leaderboardRank > 100) {
        return `${imagePath}${rankTier}.png`;
      }
    }

    if (rankTier && !leaderboardRank) {
      return `${imagePath}${rankTier}.png`;
    }

    return `${imagePath}00.png`;
  }

  // public findPlayerAvatar(): string {
  //   const avatar = this.mPlayerDetails.profileInfo.avatar;

  //   if (avatar !== '') return avatar;

  //   return '/pictures/dota-player-icons/anonymous.jpg';
  // }

  public findAppropriateItems(player: Player, items: Items): PlayerItems | null {
    const emptyItemValue = {
      abilities: null,
      hint: null,
      name: 'empty_slot',
      id: null,
      dname: 'Empty Slot',
      cost: null,
      attrib: null,
      behavior: null,
      bkbpierce: null,
      dispellable: null,
      mc: null,
      cd: null,
      lore: null,
      components: null,
      tier: null,
    };

    this.mPlayerItems = {
      item_0: emptyItemValue,
      item_1: emptyItemValue,
      item_2: emptyItemValue,
      item_3: emptyItemValue,
      item_4: emptyItemValue,
      item_5: emptyItemValue,

      backpack_0: emptyItemValue,
      backpack_1: emptyItemValue,
      backpack_2: emptyItemValue,

      item_neutral: emptyItemValue,

      aghanims_scepter: emptyItemValue,
      aghanims_shard: emptyItemValue,
    };

    for (const [key, value] of Object.entries(items)) {
      const itemValue = {
        abilities: value.abilities,
        hint: value.hint,
        name: key,
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
      };

      switch (value.id) {
        case player.item_0:
          this.mPlayerItems['item_0'] = itemValue;
          break;

        case player.item_1:
          this.mPlayerItems['item_1'] = itemValue;
          break;

        case player.item_2:
          this.mPlayerItems['item_2'] = itemValue;
          break;

        case player.item_3:
          this.mPlayerItems['item_3'] = itemValue;
          break;

        case player.item_4:
          this.mPlayerItems['item_4'] = itemValue;
          break;
        case player.item_5:
          this.mPlayerItems['item_5'] = itemValue;
          break;

        case player.backpack_0:
          this.mPlayerItems['backpack_0'] = itemValue;
          break;

        case player.backpack_1:
          this.mPlayerItems['backpack_1'] = itemValue;
          break;

        case player.backpack_2:
          this.mPlayerItems['backpack_2'] = itemValue;
          break;

        case player.item_neutral:
          this.mPlayerItems['item_neutral'] = itemValue;

        default:
          break;
      }
    }

    return this.mPlayerItems;
  }

  public findItemCostByKey(key: string, items: Items): string {
    let cost = 0;

    if (items[key].cost) cost = items[key].cost;

    return cost.toString();
  }

  // Hero details
  private mPlayerHero: PlayerHero = {
    name: '',
    localizedName: '',
    heroVariant: {
      icon: '',
      color: '',
      colorSingle: '',
      title: '',
      description: '',
    },
    playerColor: '',
  };

  // Player details
  private mPlayerDetails: PlayerDetails = {
    profileInfo: {
      profilePicture: '',
      rankIcon: '',
      profileUrl: '',
    },
    rankTierInfo: null,
    leaderboardRankInfo: null,
  };

  // Player's item details
  private mPlayerItems: PlayerItems | any = {};

  // Cache for current hero
  private mCurrentHero: string = '';

  // Player's slot colors
  private mPlayerColors: PlayerColors = {
    radiant: {
      teamNumber: 0,
      colors: {
        '0': '#3375ff',
        '1': '#66ffbf',
        '2': '#bf00bf',
        '3': '#f3f00b',
        '4': '#ff6b00',
      },
    },

    dire: {
      teamNumber: 1,
      colors: {
        '0': '#fe86c2',
        '1': '#a1b447',
        '2': '#65d9f7',
        '3': '#008321',
        '4': '#a46900',
      },
    },
  };

  // Hero facet gradient colors
  private mFacetGradientColor: FacetGradientColors = {
    colorRed0Single: '#4A2040',
    colorRed1Single: '#452732',
    colorRed2Single: '#4F2A25',
    colorRed0: 'linear-gradient(to right, #9F3C3C, #4A2040)',
    colorRed1: 'linear-gradient(to right, #954533, #452732)',
    colorRed2: 'linear-gradient(to right, #A3735E, #4F2A25)',

    colorYellow0Single: '#6F3D21',
    colorYellow1Single: '#604928',
    colorYellow2Single: '#433828',
    colorYellow3Single: '#4D352B',
    colorYellow0: 'linear-gradient(to right, #C8A45C, #6F3D21)',
    colorYellow1: 'linear-gradient(to right, #C6A158, #604928)',
    colorYellow2: 'linear-gradient(to right, #CAC194, #433828)',
    colorYellow3: 'linear-gradient(to right, #C3A99A, #4D352B)',

    colorPurple0Single: '#412755',
    colorPurple1Single: '#282752',
    colorPurple2Single: '#261C44',
    colorPurple0: 'linear-gradient(to right, #B57789, #412755)',
    colorPurple1: 'linear-gradient(to right, #9C70A4, #282752)',
    colorPurple2: 'linear-gradient(to right, #675CAE, #261C44)',

    colorBlue0Single: '#342D5B',
    colorBlue1Single: '#2A385E',
    colorBlue2Single: '#135459',
    colorBlue3Single: '#385B59',
    colorBlue0: 'linear-gradient(to right, #727CB2, #342D5B)',
    colorBlue1: 'linear-gradient(to right, #547EA6, #2A385E)',
    colorBlue2: 'linear-gradient(to right, #6BAEBC, #135459)',
    colorBlue3: 'linear-gradient(to right, #94B5BA, #385B59)',

    colorGreen0Single: '#2D5A18',
    colorGreen1Single: '#29493A',
    colorGreen2Single: '#2D5A18',
    colorGreen3Single: '#223824',
    colorGreen4Single: '#3F4129',
    colorGreen0: 'linear-gradient(to right, #A2B23E, #2D5A18)',
    colorGreen1: 'linear-gradient(to right, #7EC2B2, #29493A)',
    colorGreen2: 'linear-gradient(to right, #A2B23E, #2D5A18)',
    colorGreen3: 'linear-gradient(to right, #9A9F6A, #223824)',
    colorGreen4: 'linear-gradient(to right, #9FAD8E, #3F4129)',

    colorGray0Single: '#1B1B21',
    colorGray1Single: '#29272C',
    colorGray2Single: '#3E464F',
    colorGray3Single: '#4E5557',
    colorGray0: 'linear-gradient(to right, #565C61, #1B1B21)',
    colorGray1: 'linear-gradient(to right, #6A6D73, #29272C)',
    colorGray2: 'linear-gradient(to right, #95A9B1, #3E464F)',
    colorGray3: 'linear-gradient(to right, #ADB6BE, #4E5557)',
  };

  private findColor(player: Player): void {
    if (player.team_number === this.mPlayerColors.radiant.teamNumber) {
      for (const [colorKey, colorValue] of Object.entries(this.mPlayerColors.radiant.colors)) {
        if (player.player_slot.toString() === colorKey) {
          this.mPlayerHero.playerColor = colorValue;
        }
      }
    }

    if (player.team_number === this.mPlayerColors.dire.teamNumber) {
      for (const [colorKey, colorValue] of Object.entries(this.mPlayerColors.dire.colors)) {
        if (player.team_slot.toString() === colorKey) {
          this.mPlayerHero.playerColor = colorValue;
        }
      }
    }
  }

  private findHeroName(player: Player, heroList: Hero[]): void {
    for (let i = 0; i < heroList.length; ++i) {
      const hero = heroList[i];

      if (player.hero_id === hero.id) {
        this.mPlayerHero.name = hero.name;
        this.mPlayerHero.name = this.mPlayerHero.name.replace('npc_dota_hero_', '');
        this.mPlayerHero.localizedName = hero.localized_name;
        this.mCurrentHero = hero.name;
      }
    }
  }

  private findHeroFacet(player: Player, heroAbilities: any): void {
    if (heroAbilities) {
      for (const [heroID, value] of Object.entries(heroAbilities)) {
        if (this.mCurrentHero === heroID) {
          switch (player.hero_variant) {
            case 1:
              this.setHeroFacet(value, 0);
              break;

            case 2:
              this.setHeroFacet(value, 1);
              break;

            case 3:
              this.setHeroFacet(value, 2);
              break;

            case 4:
              this.setHeroFacet(value, 3);
              break;

            case 5:
              this.setHeroFacet(value, 4);
              break;

            default:
              break;
          }
        }
      }
    }
  }

  private setHeroFacet(value: any, facetID: number): void {
    if (value.facets[facetID]) {
      this.mPlayerHero.heroVariant.icon = value.facets[facetID].icon;

      let highLevelColor: string = value.facets[facetID].color;
      let gradientId: number = value.facets[facetID].gradient_id;
      this.mPlayerHero.heroVariant.color =
        this.mFacetGradientColor[`color${highLevelColor}${gradientId}`];
      this.mPlayerHero.heroVariant.colorSingle =
        this.mFacetGradientColor[`color${highLevelColor}${gradientId}Single`];

      this.mPlayerHero.heroVariant.title = value.facets[facetID].title;
      this.mPlayerHero.heroVariant.description = value.facets[facetID].description;
    }
  }
}
