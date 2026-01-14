import { makeStore } from '@/features/matchPage/store/store';

export type MatchPageStore = ReturnType<typeof makeStore>;
export type MatchPageRootState = ReturnType<MatchPageStore['getState']>;
export type MatchPageDispatch = MatchPageStore['dispatch'];

export interface Match {
  players: Player[];

  radiant_win: boolean;
  duration: number;
  pre_game_duration: number;
  start_time: number;
  match_id: number;
  match_seq_num: number;
  tower_status_radiant: number;
  tower_status_dire: number;
  barracks_status_radiant: number;
  barracks_status_dire: number;
  cluster: number;
  first_blood_time: number;
  lobby_type: number;
  human_players: number;
  leagueid: number;
  game_mode: number;
  flags: number;
  engine: number;
  radiant_name: string;
  dire_name: string;
  radiant_score: number;
  dire_score: number;
  radiant_gold_adv: number[];
  radiant_xp_adv: number[];

  picks_bans: PicksAndBans[];

  objectives: Objectives[];

  od_data: {
    has_api: boolean;
    has_gcdata: boolean;
    has_parsed: boolean;
  };
  metadata: null | unknown;
  patch: number;
  region: number;
  replay_url?: string;
}

// Match.tsx
export interface MatchPageData {
  match: Match | null;

  // optional
  playersByTeam?: PlayersByTeam | null;
}

export interface MatchPageSlice {
  matchPageData: MatchPageData;
  playerProfiles: PlayerProfile[] | null;
  constants: DotaConstants | null;

  error: string | null;
}

export interface DotaConstants {
  heroes: Heroes;
  heroAbilities: unknown;
  abilityIds: unknown;
  items: Items;
  region: Region;
  gameMode: GameMode;
  lobbyType: LobbyType;
  leagues: League[];
}

export interface Heroes {
  [key: string]: Hero;
}

export interface MatchResult {
  result: boolean;
  duration: string;
  radiantScore: string;
  direScore: string;
}

export interface Player {
  account_id: number;
  player_slot: number;
  team_number: number;
  team_slot: number;
  hero_id: number;
  hero_variant: number;
  item_0: number;
  item_1: number;
  item_2: number;
  item_3: number;
  item_4: number;
  item_5: number;
  backpack_0: number;
  backpack_1: number;
  backpack_2: number;
  item_neutral: number;
  purchase_log: [
    {
      time: number;
      key: string;
    },
  ];
  kills: number;
  deaths: number;
  assists: number;
  leaver_status: number;
  last_hits: number;
  denies: number;
  gold_per_min: number;
  xp_per_min: number;
  level: number;
  net_worth: number;
  aghanims_scepter: number;
  aghanims_shard: number;
  moonshard: number;
  hero_damage: number;
  rune_pickups: number;
  tower_damage: number;
  hero_healing: number;
  gold: number;
  gold_spent: number;
  ability_upgrades_arr: number[];
  personaname: string;
  name: null | string;
  last_login: null | string;
  radiant_win: boolean;
  start_time: number;
  duration: number;
  cluster: number;
  lobby_type: number;
  game_mode: number;
  is_contributor: boolean;
  patch: number;
  region: number;
  isRadiant: boolean;
  win: number;
  lose: number;
  total_gold: number;
  total_xp: number;
  kills_per_min: number;
  kda: number;
  abandons: number;
  rank_tier: number;
  is_subscriber: boolean;
  lane?: number;
  lane_role?: number;
  benchmarks: {
    gold_per_min: {
      raw: number;
      pct: number;
    };
    xp_per_min: {
      raw: number;
      pct: number;
    };
    kills_per_min: {
      raw: number;
      pct: number;
    };
    last_hits_per_min: {
      raw: number;
      pct: number;
    };
    hero_damage_per_min: {
      raw: number;
      pct: number;
    };
    hero_healing_per_min: {
      raw: number;
      pct: number;
    };
    tower_damage: {
      raw: number;
      pct: number;
    };
  };
}

export interface PlayerDetails {
  profileInfo: {
    avatar: string;
    rankIcon: string;
    profileUrl: string;
  };
  rankTier: number | null;
  leaderboardRank: number | null;
}

export interface PlayerHero {
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

export interface PlayerColors {
  radiant: {
    teamNumber: number;

    colors: Colors;
  };

  dire: {
    teamNumber: number;

    colors: Colors;
  };
}

export interface PicksAndBans {
  isPick: boolean;
  heroId: number;
  team: number;
  order: number;
}

export interface Objectives {
  time: number;
  type: string;
  key?: string;
}

export interface PlayerProfile {
  error: unknown;
  profile: {
    account_id: number;
    avatar: string;
    avatarmedium: string;
    avatarfull: string;
    profileurl: string;
  };
  rank_tier: number | null;
  leaderboard_rank: number | null;
}

export interface Hero {
  id: number;
  name: string;
  localized_name: string;
}

export interface Items {
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

export interface Ability {
  type: string;
  title: string;
  description: string;
}

export interface Attribute {
  key: string;
  display?: string;
  value: string;
}

export interface Region {
  [key: string]: string;
}

export interface GameMode {
  [key: string]: {
    id: number;
    name: string;
    balanced: boolean;
  };
}

export interface LobbyType {
  [key: string]: {
    id: number;
    name: string;
    balanced: boolean;
  };
}

export interface League {
  leagueid: number;
  tier: string;
  name: string;
}

export interface MatchOverview {
  findMatchResult(match: Match): MatchResult;

  filterPlayersByTeam(match: Match): PlayersByTeam;

  picksBans(match: Match, side: string): PicksAndBans[] | string;

  findHeroInPickBans(heroes: Hero[], heroId: number): void | string;
}

export interface PlayersByTeam {
  radiant: Player[] | null;
  dire: Player[] | null;
}

export interface PlayerColors {
  radiant: {
    teamNumber: number;

    colors: Colors;
  };

  dire: {
    teamNumber: number;

    colors: Colors;
  };
}

export interface Colors {
  '0': string;
  '1': string;
  '2': string;
  '3': string;
  '4': string;
}

export interface FacetGradientColors {
  [ket: string]: string;
}
