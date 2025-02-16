import { Image } from '@/shared/nextjsImports'
import { useRef } from '@/shared/reactImports'

import type { HeroDetails } from '@/types/statistic/playerRow'

export default function FacetDescription({ heroDetails }: { heroDetails: HeroDetails }) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      style={{ position: 'absolute', top: (ref?.current?.offsetHeight || 0) / 2, right: 0 }}
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_HERO_FACET_ICON_URL}${heroDetails.heroVariant.icon}.png`}
        alt={heroDetails.heroVariant.icon}
        width={72}
        height={72}
      />
      <p>{heroDetails.heroVariant.description}</p>
    </div>
  )
}

const facetDescStyle: React.CSSProperties = {}
