export interface MetaData {
  heroStatsData: HeroStats[]
}

export interface HeroStats {
  id: number
  name: string
  localized_name: string

  pro_pick: number
  pro_win: number

  '1_pick': number
  '1_win': number
  '2_pick': number
  '2_win': number
  '3_pick': number
  '3_win': number
  '4_pick': number
  '4_win': number
  '5_pick': number
  '5_win': number
  '6_pick': number
  '6_win': number
  '7_pick': number
  '7_win': number
  '8_pick': number
  '8_win': number
}

export interface TableSort {
  keyToSort: string
  direction: boolean
}
