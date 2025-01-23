export type PlayerLane = {
  firstHero: {
    key: number
    iconUrl: string | null
  }
  secondHero: {
    key: number
    iconUrl: string | null
  } | null

  isRadiant: boolean
  laneRole: number
  position: {
    offsetTop: number
    offsetLeft: number
  }
}
export type LanePositions = {
  [key: string]: {
    [key: string]: {
      offsetTop: number
      offsetLeft: number
    }
  }
}
