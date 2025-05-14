export class MatchOverview implements CMatchOverview {
  public static getInstance(): MatchOverview {
    if (!MatchOverview.instance) {
      MatchOverview.instance = new MatchOverview();
    }
    return MatchOverview.instance;
  }

  public findMatchResult(match: Match): MatchResult {
    const matchResult: MatchResult = {
      result: match.radiant_win,
      duration: `${Math.floor(match.duration / 60)}:${(match.duration % 60).toString().padStart(2, '0')}`,
      radiantScore: match.radiant_score.toString(),
      direScore: match.dire_score.toString(),
    };

    return matchResult;
  }

  public filterPlayersByTeam(match: Match): PlayersByTeam {
    const radiant = match.players.filter((player) => player.isRadiant);
    const dire = match.players.filter((player) => !player.isRadiant);
    return { radiant, dire };
  }

  public picksBans(match: Match, side: string): PicksAndBans[] | string {
    switch (side) {
      case 'radiant': {
        if (!match.picks_bans) return [];

        const radiant = match.picks_bans.filter((el) => el.team === 0);
        return radiant;
      }
      case 'dire': {
        if (!match.picks_bans) return [];

        const dire = match.picks_bans.filter((el) => el.team === 1);
        return dire;
      }
      default: {
        return 'pickBans function call failed';
      }
    }
  }

  public findHeroInPickBans(heroes: Hero[], heroId: number): void | string {
    for (let i = 0; i < heroes.length; ++i) {
      const hero = heroes[i];

      if (heroId === hero.id) {
        return hero.name.replace('npc_dota_hero_', '');
      }
    }
  }

  public findRegion(match: Match, region: Region): string {
    const currRegion = region[match.region];

    if (!currRegion) return '';

    const resultedRegion = currRegion.toLowerCase().split('');
    resultedRegion.forEach((el, idx) => {
      if (idx === 0) {
        return (resultedRegion[idx] = resultedRegion[idx].toUpperCase());
      }
      if (el === ' ') {
        return (resultedRegion[idx + 1] = resultedRegion[idx + 1].toUpperCase());
      }
    });
    return resultedRegion.join('');
  }

  public findGameMode(match: Match, gameMode: GameMode): string {
    const currMode =
      gameMode[match.game_mode].name.replace('game_mode_', '').replace('_', ' ') || '';

    if (!currMode) return '';

    const resultedMode = currMode.split('');
    for (let i = 0; i < resultedMode.length; ++i) {
      if (i === 0) resultedMode[i] = resultedMode[i].toUpperCase();
      if (resultedMode[i] === ' ') resultedMode[i + 1] = resultedMode[i + 1].toUpperCase();
    }

    return resultedMode.join('');
  }

  public findLeague(match: Match, leagues: League[]): string {
    let resultedLeague = '';

    leagues.some((league) => {
      if (match.leagueid !== 0 && match.leagueid === league.leagueid) {
        resultedLeague = league.name;
        return true;
      }
    });

    return resultedLeague;
  }

  public findItemNames(slotsType: SlotsType, playerItems: PlayerItem): string[] {
    const itemNames = [];

    switch (slotsType) {
      case SlotsType.Main: {
        for (let i = 0; i < SlotSizes.Main; ++i) {
          const itemName = playerItems[`item_${i}`]?.name;
          if (typeof itemName === 'string') {
            itemNames.push(itemName);
          }
        }
        break;
      }
      case SlotsType.Backpack: {
        for (let i = 0; i < SlotSizes.Backpack; ++i) {
          const itemName = playerItems[`backpack_${i}`]?.name;
          if (typeof itemName === 'string') {
            itemNames.push(itemName);
          }
        }
        break;
      }
    }

    return itemNames;
  }

  public findPlayerItem(
    playerItemCategory: PlayerItemCategory,
    itemName: string,
    playerItems?: PlayerItem,
    player?: Player
  ): PlayerItem | null {
    switch (playerItemCategory) {
      case PlayerItemCategory.MainAndBackpack: {
        if (!playerItems) {
          break;
        }

        let resPlayerItem: PlayerItem = {};

        for (const value of Object.values(playerItems)) {
          if (itemName === value.name) {
            resPlayerItem[itemName] = value;
            break;
          }
        }

        if (typeof player?.purchase_log !== 'undefined') {
          this.findPlayerItemPurchaseTime(player, itemName, resPlayerItem);
        }

        return resPlayerItem;
      }
      case PlayerItemCategory.Aghanim: {
        if (itemName === 'ultimate_scepter') {
          return this.ultimateScepter;
        }

        if (itemName === 'aghanims_shard') {
          return this.aghanimsShard;
        }
        break;
      }
    }

    return null;
  }

  public handleMouseItemEnter(
    slotsType: SlotsType,
    itemName: string,
    itemNameIndex?: number | string,
    setterFn?: any
  ): void {
    switch (slotsType) {
      case SlotsType.Main:
      case SlotsType.Backpack: {
        if (itemName === 'empty_slot' || itemNameIndex === undefined) return;

        itemNameIndex.toString();
        setterFn((prevState: any) => {
          const newState = { ...prevState, [itemNameIndex]: true };

          return newState;
        });

        break;
      }
      case SlotsType.Neutral: {
        if (itemName === 'empty_slot') return;

        setterFn(true);

        break;
      }
      case SlotsType.Aghanim: {
        if (itemNameIndex === undefined) return;

        setterFn((prevState: any) => {
          const newState = { ...prevState, [itemNameIndex]: true };
          return newState;
        });

        break;
      }
    }
  }

  public handleMouseItemLeave(
    slotsType: SlotsType,
    itemNameIndex?: number | string,
    setterFn?: any
  ): void {
    switch (slotsType) {
      case SlotsType.Main:
      case SlotsType.Backpack: {
        if (itemNameIndex === undefined) return;

        itemNameIndex.toString();
        setterFn((prevState: any) => {
          const newState = { ...prevState, [itemNameIndex]: false };

          return newState;
        });

        break;
      }
      case SlotsType.Neutral: {
        setterFn(false);
        break;
      }
      case SlotsType.Aghanim: {
        if (itemNameIndex === undefined) return;

        setterFn((prevState: any) => {
          const newState = { ...prevState, [itemNameIndex]: false };
          return newState;
        });

        break;
      }
    }
  }

  private static instance: MatchOverview;

  private ultimateScepter: PlayerItem = {
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
      name: 'ultimate_scepter',
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
  };

  // Constant for "aghanims_shard" item
  private aghanimsShard: PlayerItem = {
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
      name: 'aghanims_shard',
      dname: "Aghanim's Shard",
      cost: 1400,
      attrib: [],
      mc: false,
      cd: false,
      lore: 'With origins known only to a single wizard, fragments of this impossible crystal are nearly as coveted as the renowned scepter itself.',
      components: undefined,
    },
  };

  private constructor() {}

  private findPlayerItemPurchaseTime(player: Player, itemName: string, resPlayerItem: PlayerItem) {
    for (const purchase of player.purchase_log) {
      if (itemName !== purchase.key) {
        continue;
      }

      let minutes = Math.floor(purchase.time / 60);
      let seconds = purchase.time % 60;

      if (minutes < 0 && seconds < 0) {
        minutes = -1;
        seconds *= -1;
      }

      resPlayerItem[itemName].purchaseTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      break;
    }
  }
}

export enum SlotsType {
  Main = 0,
  Backpack,
  Neutral,
  Aghanim,
}

enum SlotSizes {
  Main = 6,
  Backpack = 3,
}

export enum PlayerItemCategory {
  MainAndBackpack = 0,
  Aghanim,
}
