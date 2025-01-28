import { Image } from '@/shared/nextjsImports'
import { useAppSelector } from '@/hooks/useAppSelector'
import { buildings, findKilledBuildings, findPlayerLanes } from '@/utils/statistic/buildingsMap'

import styles from '@/styles/statistic/BuildingsMap.module.scss'

export default function BuildingsMap() {
  const { matchDetails, heroList } = useAppSelector((store) => store.statisticSlice)

  if (!matchDetails || !heroList || matchDetails.objectives || matchDetails.players) return // maybe some temp component

  const killedBuildings = findKilledBuildings(matchDetails.objectives)
  const playerLanes = findPlayerLanes(matchDetails.players, heroList)

  return (
    <div className={styles.buildingsMap}>
      <h4>buildings map</h4>
      <div className={styles.buildingsMap__mapStatus}>
        <Image
          src={process.env.NEXT_PUBLIC_DOTA_MAP_PICTURE_URL as string}
          alt='Dota2 map'
          width={350}
          height={350}
        />
        {buildings.map((b, idx) => {
          const isKilled = killedBuildings?.some((kb) => kb.key === b.key)
          const filter = isKilled ? 'grayscale(100%) brightness(70%)' : 'contrast(150%)'

          return (
            <span
              key={idx}
              style={{
                position: 'absolute',
                top: b.offsetTop,
                left: b.offsetLeft,
                width: '0px',
                height: '0px',
              }}
            >
              <Image
                src={b.url}
                alt='building'
                width={b.width}
                height={b.height}
                style={{
                  filter: filter,
                }}
              />
            </span>
          )
        })}
        {playerLanes &&
          playerLanes.map((pl) => {
            let flexDirection: React.CSSProperties['flexDirection'] = undefined

            switch (pl.laneRole) {
              case 1:
              case 2: {
                if (pl.isRadiant) {
                  flexDirection = 'row-reverse'
                } else {
                  flexDirection = 'row'
                }
                break
              }
              case 3: {
                if (!pl.isRadiant) {
                  flexDirection = 'column-reverse'
                } else {
                  flexDirection = 'column'
                }
                break
              }
            }

            return (
              <div
                key={pl.firstHero.key}
                style={{
                  position: 'absolute',
                  top: pl.position.offsetTop,
                  left: pl.position.offsetLeft,
                  display: 'flex',
                  flexDirection: flexDirection,
                  gap: '0.2rem',
                  filter: pl.isRadiant
                    ? 'drop-shadow(#59ce8f 0px 0px 5px)'
                    : 'drop-shadow(#df2e38 0px 0px 5px)',
                }}
              >
                <Image src={pl.firstHero.iconUrl as string} alt='hero' width={30} height={30} />
                {pl.secondHero && (
                  <Image src={pl.secondHero.iconUrl as string} alt='hero' width={30} height={30} />
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}
