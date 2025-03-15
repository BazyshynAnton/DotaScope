import { AbilityDetailsUtility } from '@/utils/statistic/ability-details-utility';
import { useAppSelector } from '@/hooks/use-app-selector';

import styles from '@/styles/statistic/ability-description.module.scss';

export default function Description({ abilityKey }: { abilityKey: string }) {
  const { abilities } = useAppSelector((store) => store.statisticSlice);

  const uAbilityDetails = AbilityDetailsUtility.getInstance();
  const description = uAbilityDetails.findAbilityDescription(abilityKey, abilities);

  return <div className={styles.aboutAbility}>{description}</div>;
}
