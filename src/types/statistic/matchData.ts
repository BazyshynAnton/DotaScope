export interface MatchData {
  matchDetailsData: MatchDetails
  playerProfilesData: PlayerProfile[]
}

export interface DotaConstants {
  heroListData: HeroList[]
  abilitiesData: any
  heroAbilitiesData: any
  abilityIDsData: any
  itemsData: any
  regionData: Region
  gameModeData: GameMode
  lobbyTypeData: LobbyType
  leaguesData: League[]
}

export interface HeroList {
  id: number
  name: string
  localized_name: string
}

export interface Match {
  match_id: number
  player_slot: number
  radiant_win: boolean
  hero_id: number
  start_time: number
  duration: number
  game_mode: number
  lobby_type: number
  version: number | null
  kills: number
  deaths: number
  assists: number
  average_rank: number
  xp_per_min: number
  gold_per_min: number
  hero_damage: number
  tower_damage: number
  hero_healing: number
  last_hits: number
  lane: number | string | null
  lane_role: number | string | null
  is_roaming: number | string | boolean | null
  cluster: number
  leaver_status: number
  party_size: number | null
  hero_variant: number
}

export interface MatchDetails {
  players: Player[]

  radiant_win: boolean
  duration: number
  pre_game_duration: number
  start_time: number
  match_id: number
  match_seq_num: number
  tower_status_radiant: number
  tower_status_dire: number
  barracks_status_radiant: number
  barracks_status_dire: number
  cluster: number
  first_blood_time: number
  lobby_type: number
  human_players: number
  leagueid: number
  game_mode: number
  flags: number
  engine: number
  radiant_name: string
  dire_name: string
  radiant_score: number
  dire_score: number
  radiant_gold_adv: number[]
  radiant_xp_adv: number[]

  picks_bans: PicksAndBans[]

  objectives: Objectives[]

  od_data: {
    has_api: boolean
    has_gcdata: boolean
    has_parsed: boolean
  }
  metadata: null | any
  patch: number
  region: number
  replay_url?: string
}

export type PicksAndBans = {
  is_pick: boolean
  hero_id: number
  team: number
  order: number
}

export type Objectives = {
  time: number
  type: string
  key?: string
}

export interface PlayerProfile {
  error: any
  profile: {
    account_id: number
    avatar: string
    avatarmedium: string
    avatarfull: string
    profileurl: string
  }
  rank_tier: number | null
  leaderboard_rank: number | null
}

export interface Region {
  [key: string]: string
}

export interface GameMode {
  [key: string]: {
    id: number
    name: string
    balanced: boolean
  }
}

export interface LobbyType {
  [key: string]: {
    id: number
    name: string
    balanced: boolean
  }
}

export interface League {
  leagueid: number
  tier: string
  name: string
}

export type Player = {
  account_id: number
  player_slot: number
  team_number: number
  team_slot: number
  hero_id: number
  hero_variant: number
  item_0: number
  item_1: number
  item_2: number
  item_3: number
  item_4: number
  item_5: number
  backpack_0: number
  backpack_1: number
  backpack_2: number
  item_neutral: number
  purchase_log: [
    {
      time: number
      key: string
    },
  ]
  kills: number
  deaths: number
  assists: number
  leaver_status: number
  last_hits: number
  denies: number
  gold_per_min: number
  xp_per_min: number
  level: number
  net_worth: number
  aghanims_scepter: number
  aghanims_shard: number
  moonshard: number
  hero_damage: number
  tower_damage: number
  hero_healing: number
  gold: number
  gold_spent: number
  ability_upgrades_arr: number[]
  personaname: string
  name: null | string
  last_login: null | string
  radiant_win: boolean
  start_time: number
  duration: number
  cluster: number
  lobby_type: number
  game_mode: number
  is_contributor: boolean
  patch: number
  region: number
  isRadiant: boolean
  win: number
  lose: number
  total_gold: number
  total_xp: number
  kills_per_min: number
  kda: number
  abandons: number
  rank_tier: number
  is_subscriber: boolean
  lane?: number
  lane_role?: number
  benchmarks: {
    gold_per_min: {
      raw: number
      pct: number
    }
    xp_per_min: {
      raw: number
      pct: number
    }
    kills_per_min: {
      raw: number
      pct: number
    }
    last_hits_per_min: {
      raw: number
      pct: number
    }
    hero_damage_per_min: {
      raw: number
      pct: number
    }
    hero_healing_per_min: {
      raw: number
      pct: number
    }
    tower_damage: {
      raw: number
      pct: number
    }
  }
}
