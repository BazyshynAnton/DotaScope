'use client'

import NameAndCost from './NameAndCost'
import Behavior from './Behavior'
import Attribute from './Attribute'
import Abilities from './Abilities'
import HintAndLore from './HintAndLore'
import Components from './Components'

import useMousePosition from '@/hooks/useMousePosition'
import { ReactDOM, useEffect, useRef, useState } from '@/shared/reactImports'
import type { ItemDescriptionInterface } from '@/types/statistic/playerRow'

import styles from '@/styles/statistic/ItemDescription.module.scss'

export default function ItemDescription({ details, item }: ItemDescriptionInterface) {
  //
  /* 
    Using React Portal transfer this component to another
    component with id="tooltip_item_portal" on desktop.
  */
  const [isBlurEffect, setIsBlurEffect] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsBlurEffect(window.innerWidth <= 790)
      const updateWindowWidth = () => {
        setIsBlurEffect(window.innerWidth <= 790)
      }

      updateWindowWidth()

      window.addEventListener('resize', updateWindowWidth)

      return () => window.removeEventListener('resize', updateWindowWidth)
    }
  }, [])

  return isBlurEffect ? (
    <MobilePortal details={details} item={item} />
  ) : (
    <DesktopPortal details={details} item={item} />
  )
}

function ItemContent({ details, item }: ItemDescriptionInterface) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <>
      <NameAndCost details={details} item={item} />
      <div
        ref={ref}
        className={
          (ref.current?.offsetHeight as number) <= 12 ? undefined : styles.tooltip__description
        }
      >
        <Behavior details={details} item={item} />
        <Attribute details={details} item={item} />
        <Abilities details={details} item={item} />
        <HintAndLore details={details} item={item} />
        <Components details={details} item={item} />
      </div>
    </>
  )
}

function MobilePortal({ details, item }: ItemDescriptionInterface) {
  return ReactDOM.createPortal(
    <div className={styles.bgBlur}>
      <div className={styles.itemDescription}>
        <ItemContent details={details} item={item} />
      </div>
    </div>,
    document.getElementById('tooltip_item_portal') as Element | DocumentFragment,
  )
}

function DesktopPortal({ details, item }: ItemDescriptionInterface) {
  const [componentHeight, setComponentHeight] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      setComponentHeight(ref.current.offsetHeight)
    }
  }, [ref.current])

  const mousePosition = useMousePosition()

  if (!mousePosition.x || !mousePosition.y) return

  return ReactDOM.createPortal(
    <div
      ref={ref}
      style={{
        visibility: componentHeight ? 'visible' : 'hidden',
        position: 'absolute',
        top: mousePosition.y - (componentHeight || 0) / 2,
        left: mousePosition.x - 308,
      }}
      className={styles.itemDescription}
    >
      <ItemContent details={details} item={item} />
    </div>,
    document.getElementById('tooltip_item_portal') as Element | DocumentFragment,
  )
}
