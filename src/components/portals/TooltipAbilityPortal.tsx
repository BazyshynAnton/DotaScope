'use client';

import { useAppSelector } from '@/hooks/use-app-selector';

import styles from '@/styles/portals/tooltip-ability-portal.module.scss';

export default function TooltipAbilityPortal() {
  const { tooltipAbilityPortal } = useAppSelector((store) => store.statisticSlice);

  return (
    <div
      id="tooltip_ability_portal"
      className={tooltipAbilityPortal ? styles.tooltip : styles.simpleBg}
    ></div>
  );
}
