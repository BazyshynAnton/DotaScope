import { Item } from '../statistic/playerRow'
import type { Player } from '../statistic/tableDetails'

export interface InitialStatisticState {
  matchDetails: MatchDetails | null
  heroList: HeroList[] | null
  playersProfiles: PlayerProfile[] | null

  abilities: any | null
  heroAbilities: any | null
  abilityIDs: any | null
  items: Item | null
  region: Region | null
  gameMode: GameMode | null
  lobbyType: LobbyType | null
  leagues: League[] | null

  isTableDataExist: boolean
  tooltipAbilityPortal: boolean
  tableLoading: boolean

  search: {
    [key: string]: string
  }

  error: string | null
}

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
