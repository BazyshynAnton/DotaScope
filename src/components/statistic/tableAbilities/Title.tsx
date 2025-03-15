import { Image } from '@/shared/nextjs-imports';
import { AbilityDetailsUtility } from '@/utils/statistic/ability-details-utility';
import { useAppSelector } from '@/hooks/use-app-selector';

import styles from '@/styles/statistic/ability-description.module.scss';

export default function Title({ abilityKey }: { abilityKey: string }) {
  const { abilities } = useAppSelector((store) => store.statisticSlice);

  const uAbilityDetails = AbilityDetailsUtility.getInstance();
  const name = uAbilityDetails.findAbilityRealName(abilityKey, abilities);

  const talentTree: boolean = abilityKey.includes('special_bonus');

  return (
    <>
      <div className={!talentTree ? styles.title : styles.title_bonus}>
        <Image
          src={
            !talentTree
              ? `${process.env.NEXT_PUBLIC_HERO_ABILITY_ICON_URL}${abilityKey}.png`
              : '/pictures/dotaAbilityIcons/talent_tree.svg'
          }
          alt={name}
          width={52}
          height={52}
        />
        <div className={styles.title__name}>
          {name === '' ? '+2 Attributes' : name === 'unnamed' ? 'Auto Attack/Other' : name}
        </div>
      </div>
    </>
  );
}
