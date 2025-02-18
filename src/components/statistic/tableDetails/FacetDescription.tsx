import { Image } from '@/shared/nextjsImports'
import { React, useEffect, useRef, useState } from '@/shared/reactImports'

import { MdArrowLeft } from 'react-icons/md'

import type { HeroDetails } from '@/types/statistic/playerRow'

export default function FacetDescription({ heroDetails }: { heroDetails: HeroDetails }) {
  const [componentHeight, setComponentHeight] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      setComponentHeight(ref.current.offsetHeight)
    }
  }, [ref.current])

  return (
    <div
      ref={ref}
      style={{
        top: 6 - (componentHeight || 0) / 2,
        left: 20,
        ...facetDescStyle,
      }}
    >
      <span>
        <MdArrowLeft />
      </span>
      <div
        style={{
          background: `${heroDetails.heroVariant.color}`,
          ...facetTitleStyle,
        }}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_HERO_FACET_ICON_URL}${heroDetails.heroVariant.icon}.png`}
          alt={heroDetails.heroVariant.icon}
          width={50}
          height={50}
          style={{
            width: '50px',
            height: '50px',
            paddingRight: '10px',
          }}
        />
        <h3>{heroDetails.heroVariant.title}</h3>
      </div>
      <p style={{ ...facetDescParagraphStyle }}>{heroDetails.heroVariant.description}</p>
    </div>
  )
}

const facetDescStyle: React.CSSProperties = {
  position: 'absolute',
  width: 'max-content',
  height: 'max-content',
  background: '#152128',
}

const facetTitleStyle: React.CSSProperties = {
  padding: '5px 15px 5px 5px',
  width: '100%',
  height: 'max-content',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  color: '#ffffffde',
}

const facetDescParagraphStyle: React.CSSProperties = {
  padding: '5px',
  maxWidth: '280px',
  width: '100%',
  display: 'inline-block',
  textAlign: 'left',
  fontSize: '13px',
}
