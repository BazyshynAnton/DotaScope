export interface MetaData {
  heroStatsData: HeroStats[]
}

export interface HeroStats {
  id: number
  name: string
  localized_name: string
  pro_pick: number
  pro_win: number
  pub_pick_trend: number[]
  pub_win_trend: number[]
}
