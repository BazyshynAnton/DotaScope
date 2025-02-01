import { DotaNews, ProMatch } from '../home/homeData'

export interface InitialHomeState {
  proMatches: ProMatch[] | null
  dotaNews: DotaNews | null
  isHomeDataExist: boolean

  error: string | null
}
