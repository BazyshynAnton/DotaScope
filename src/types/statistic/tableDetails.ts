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
