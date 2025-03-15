'use client';

import Cost from './Cost';
import Attributes from './Attributes';
import Title from './Title';
import Behavior from './Behavior';
import Description from './Description';

import { ReactDOM } from '@/shared/react-imports';

import styles from '@/styles/statistic/ability-description.module.scss';

export default function AbilityDescription({ abilityKey }: { abilityKey: string }) {
  const talentTree: boolean = abilityKey.includes('special_bonus');

  return ReactDOM.createPortal(
    <div className={styles.abilityTooltip}>
      <Title abilityKey={abilityKey} />
      {!talentTree && (
        <div className={styles.abilityTooltip__components}>
          <Behavior abilityKey={abilityKey} />
          <Description abilityKey={abilityKey} />
          <Attributes abilityKey={abilityKey} />
          <Cost abilityKey={abilityKey} />
        </div>
      )}
    </div>,
    document.getElementById('tooltip_ability_portal') as Element | DocumentFragment
  );
}
