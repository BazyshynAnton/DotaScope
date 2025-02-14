import { fetchHelper } from '../sharedUtils'

import type { HeroStats, MetaData } from '@/types/meta/metaData'

export async function fetchMetaData(): Promise<MetaData | string> {
  try {
    const heroStatsData = await fetchHelper<HeroStats[]>(
      process.env.NEXT_PRIVATE_HERO_STATS_URL as string,
      'no-cache',
    )
    if (heroStatsData instanceof Error) throw heroStatsData

    return JSON.parse(JSON.stringify({ heroStatsData } as MetaData))
  } catch (error) {
    let message
    if (error instanceof Error) message = error.message
    else message = String(error)
    return message
  }
}
