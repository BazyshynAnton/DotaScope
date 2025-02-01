import { HeroList, MatchDetails, PicksAndBans, Player } from './matchData'

export interface UMatchDetails {
  findMatchResult(matchDetails: MatchDetails): MatchResult

  filterPlayersByTeam(matchDetails: MatchDetails): PlayersByTeam

  picksBans(side: string, matchDetails: MatchDetails): PicksAndBans[] | string

  findHeroInPickBans(hero_id: number, heroList: HeroList[]): void | string
}

export interface MatchResult {
  resultOfMatch: boolean
  matchDuration: string
  radiantScore: string
  direScore: string
}

export interface PlayersByTeam {
  playersRadiant: Player[] | never[]
  playersDire: Player[] | never[]
}

export interface PlayerColors {
  radiant: {
    team_number: number

    colors: {
      '0': string
      '1': string
      '2': string
      '3': string
      '4': string
    }
  }

  dire: {
    team_number: number

    colors: {
      '0': string
      '1': string
      '2': string
      '3': string
      '4': string
    }
  }
}

export interface FacetGradientColor {
  [ket: string]: string
}
