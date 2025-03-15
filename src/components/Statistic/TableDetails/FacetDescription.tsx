import { Image } from '@/shared/nextjs-imports';
import { React, useEffect, useRef, useState } from '@/shared/react-imports';

import { MdArrowLeft } from 'react-icons/md';

import type { HeroDetails } from '@/types/statistic/player-row';

export default function FacetDescription({ heroDetails }: { heroDetails: HeroDetails }) {
  const [isBlurEffect, setIsBlurEffect] = useState(false);
  const [componentHeight, setComponentHeight] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsBlurEffect(window.innerWidth <= 790);
      const updateWindowWidth = () => {
        setIsBlurEffect(window.innerWidth <= 790);
      };

      updateWindowWidth();

      window.addEventListener('resize', updateWindowWidth);

      return () => window.removeEventListener('resize', updateWindowWidth);
    }
  }, []);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      setComponentHeight(ref.current.offsetHeight);
    }
  }, [ref.current]);

  return (
    <div
      ref={ref}
      style={{
        top: 6 - (componentHeight || 0) / 2,
        ...facetDescStyle,
      }}
    >
      <span style={{ top: (componentHeight || 0) / 2 - 6, ...arrowWrapperStyle }}>
        <MdArrowLeft style={arrowStyle} />
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
  );
}

const facetDescStyle: React.CSSProperties = {
  position: 'absolute',
  left: 26,
  width: 'max-content',
  height: 'max-content',
  background: '#152128',
};

const facetTitleStyle: React.CSSProperties = {
  padding: '5px 15px 5px 5px',
  width: '100%',
  height: 'max-content',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  color: '#ffffffde',
};

const facetDescParagraphStyle: React.CSSProperties = {
  padding: '5px',
  maxWidth: '280px',
  width: '100%',
  display: 'inline-block',
  textAlign: 'left',
  fontSize: '13px',
};

const arrowWrapperStyle: React.CSSProperties = {
  position: 'absolute',
  left: -11,
  width: 'max-content',
  zIndex: -1,
};

const arrowStyle: React.CSSProperties = {
  transform: 'scale(2.5)',
  color: '#152128',
};
