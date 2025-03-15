import { AbilityDetailsUtility } from '@/utils/statistic/ability-details-utility';
import { useAppSelector } from '@/hooks/use-app-selector';

import styles from '@/styles/statistic/ability-description.module.scss';

export default function Behavior({ abilityKey }: { abilityKey: string }) {
  const { abilities } = useAppSelector((store) => store.statisticSlice);

  const uAbilityDetails = AbilityDetailsUtility.getInstance();
  const behavior = uAbilityDetails.findAbilityBehavior(abilityKey, abilities);

  let conditionBkbpierce = true;
  if (Array.isArray(behavior.bkbpierce)) {
    conditionBkbpierce = behavior.bkbpierce.length === 0;
  }

  return (
    <div className={styles.behavior}>
      {behavior.target && (
        <div className={styles.target}>
          <div>TARGET:</div> {behavior.target}
        </div>
      )}
      {behavior.dmg_type && (
        <div className={styles.dmgType}>
          <div>DAMAGE TYPE:</div>{' '}
          <div
            className={
              behavior.dmg_type === 'Magical'
                ? styles.dmgType_magical
                : behavior.dmg_type === 'Pure'
                  ? styles.dmgType_pure
                  : styles.dmgType_physical
            }
          >
            {behavior.dmg_type}
          </div>
        </div>
      )}
      {behavior.bkbpierce && conditionBkbpierce && (
        <div className={styles.pierces}>
          <div>PIERCES DEBUFF IMMUNITY:</div>{' '}
          <div className={behavior.bkbpierce === 'Yes' ? styles.pierces_yes : styles.pierces_no}>
            {behavior.bkbpierce}
          </div>
        </div>
      )}
      {behavior.dispellable && (
        <div className={styles.dispellable}>
          <div>DISPELLABLE:</div>{' '}
          <div
            className={
              behavior.dispellable === 'Yes'
                ? styles.dispellable_yes
                : behavior.dispellable === 'No'
                  ? styles.dispellable_no
                  : styles.dispellable_strong
            }
          >
            {behavior.dispellable}
          </div>
        </div>
      )}
    </div>
  );
}
