import { AbilityDetailsUtility } from '@/utils/statistic/ability-details-utility';
import { Image } from '@/shared/nextjs-imports';
import { useAppSelector } from '@/hooks/use-app-selector';

import styles from '@/styles/statistic/ability-description.module.scss';

export default function Cost({ abilityKey }: { abilityKey: string }) {
  const { abilities } = useAppSelector((store) => store.statisticSlice);

  const uAbilityDetails = AbilityDetailsUtility.getInstance();
  const cost = uAbilityDetails.findAbilityCost(abilityKey, abilities);

  return (
    <>
      {(cost.mc || cost.cd) && (
        <div className={styles.cost}>
          {cost.mc && (
            <div className={styles.mana}>
              <CostImage type={'ability_manacost'} />
              {cost.mc}
            </div>
          )}
          {cost.cd && (
            <div className={styles.cooldown}>
              <CostImage type={'ability_cooldown'} />
              {cost.cd}
            </div>
          )}
        </div>
      )}
    </>
  );
}

function CostImage({ type }: { type: string }) {
  return <Image src={`/pictures/dotaIcons/${type}.png`} alt={type} width={15} height={15} />;
}
