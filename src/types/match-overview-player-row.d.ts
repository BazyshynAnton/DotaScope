interface CMatchOverviewPlayerRow {
  findAppropriateHero(player: Player, heroes: Hero[], heroAbilities: any): PlayerHero;

  findAppropriatePlayer(player: Player, playersProfiles: PlayerProfile[]): PlayerDetails;

  findPlayerRankIcon(): string;

  //   findPlayerAvatar(): string;

  findAppropriateItems(player: Player, items: any): PlayerItems | null;

  findItemCostByKey(key: string, items: Items): string;
}

interface CPlayerRowHelper {
  setItems(detailsAboutItems: PlayerItems, flag: string): void;

  handleMouseEnter(item: string, flag: string, idx?: number | string, setter?: any): void;

  handleMouseLeave(flag: string, idx?: number | string, setter?: any): void;

  findDetailsAboutCurrentItem(
    flag: string,
    item: string,
    detailsAboutItems?: PlayerItems
  ): PlayerItems | null;
}

type AbilityIDs = {
  [key: string]: string;
};

interface PlayerHero {
  name: string;
  localizedName: string;
  heroFacet: {
    icon: string;
    color: string;
    colorSingle: string;
    title: string;
    description: string;
  };
  playerColor: string;
}

interface PlayerDetails {
  profileInfo: {
    profilePicture: string;
    rankIcon: string;
    profileUrl: string;
  };
  rankTierInfo: number | null;
  leaderboardRankInfo: number | null;
}

interface Items {
  [key: string]: {
    abilities?: Ability[];
    hint?: string[];
    id?: number;
    img?: string;
    dname?: string;
    qual?: string;
    cost?: number | null;
    behavior?: string[] | string | boolean;
    bkbpierce?: string;
    dispellable?: string;
    target_team?: string[] | string;
    target_type?: string[] | string;
    notes?: string;
    attrib?: Attribute[];
    mc?: number | boolean;
    hc?: number | boolean;
    cd?: number | boolean;
    lore?: string;
    components?: string[] | null;
    created?: boolean;
    charges?: number | boolean;
    tier?: number;
  };
}

interface Attribute {
  key: string;
  display?: string;
  value: string;
}

interface Ability {
  type: string;
  title: string;
  description: string;
}

interface PlayerItems {
  [key: string]: {
    abilities?: Ability[];
    hint?: string[];
    name?: string;
    id?: number;
    dname?: string;
    cost?: number;
    attrib?: Attribute[];
    behavior?: string[] | string | boolean;
    bkbpierce?: string;
    dispellable?: string;
    mc?: number | boolean;
    cd?: number | boolean;
    lore?: string;
    components?: string[];
    tier?: number;
    purchaseTime?: string;
  };
}

interface SlotInterface {
  PlayerItems: PlayerItems | null;
  player?: Player;
}

// Types for ItemDescription component
interface ItemDescriptionInterface {
  details: PlayerItems | null;
  item: string;
}
