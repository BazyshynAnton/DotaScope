export interface HomeData {
  proMatchesData: ProMatch[]
  dotaNewsData: DotaNews
}

export interface ProMatch {
  match_id: number
  duration: number
  start_time: number
  radiant_team_id: number
  radiant_name: string
  dire_team_id: number
  dire_name: string
  leagueid: number
  league_name: string
  series_id: number
  series_type: number
  radiant_score: number
  dire_score: number
  radiant_win: boolean
  version: number
}

export interface DotaNews {
  appnews: {
    newsitems: [NewsItem]
  }
}

export type NewsItem = {
  gid: string
  feedlabel: string
  title: string
  url: string
  author: string
  date: number
}
