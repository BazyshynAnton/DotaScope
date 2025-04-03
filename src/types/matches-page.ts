export interface MatchesPageData {
  proMatches: ProMatch[];
  teams: Team[];
}

export interface MatchesPageSlice {
  proMatches: ProMatch[] | null;
  teams: Team[] | null;

  error: string | null;
}

export interface ProMatch {
  match_id: number;
  duration: number;
  start_time: number;
  radiant_team_id: number;
  radiant_name: string;
  dire_team_id: number;
  dire_name: string;
  leagueid: number;
  league_name: string;
  series_id: number;
  series_type: number;
  radiant_score: number;
  dire_score: number;
  radiant_win: boolean;
  version: number;
}

export interface Team {
  team_id: number;
  rating: number;
  wins: number;
  losses: number;
  last_match_time: number;
  name: string;
  tag: string;
  logo_url: string;
}

export interface MatchPageData {
  match: Match;
  playerProfiles: PlayerProfile[];
}

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
  metadata: null | any;
  patch: number;
  region: number;
  replay_url?: string;
}

export type Player = {
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
};

export type PicksAndBans = {
  is_pick: boolean;
  hero_id: number;
  team: number;
  order: number;
};

export type Objectives = {
  time: number;
  type: string;
  key?: string;
};

export interface PlayerProfile {
  error: any;
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

interface Ability {
  type: string;
  title: string;
  description: string;
}

interface Attribute {
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
