import { Image } from '@/shared/nextjs-imports';

import type { ItemDescriptionInterface } from '@/types/statistic/player-row';

import styles from '@/styles/statistic/item-description.module.scss';

export default function Abilities({ details, item }: ItemDescriptionInterface) {
  if (!details) {
    throw new Error('[DATA] Cannot get data about Item Details');
  }

  return (
    <>
      {details[item].abilities && (
        <div className={styles.abilities}>
          {details[item].abilities.map((abil) => {
            //
            // Format description from JSON file:
            // replace all "\n" symbols to <br/>
            // for using in HTML
            const formattedDescription = abil.description.replace(/\n/g, '<br/>');

            const abilityCondition =
              abil.type === 'active'
                ? styles.abilities_active
                : abil.type === 'use'
                  ? styles.abilities_use
                  : styles.abilities_passive;

            const abilityHeaderCondition =
              abil.type === 'active'
                ? styles.abilities_active__header
                : abil.type === 'use'
                  ? styles.abilities_use__header
                  : styles.abilities_passive__header;

            const displayAbilityTypeCondition =
              abil.type === 'active' ? 'Active' : abil.type === 'use' ? 'Use' : 'Passive';

            const renderAbilityCondition = abil.type === 'active' || abil.type === 'use';

            const abilityDescriptionCondition =
              abil.type === 'active'
                ? styles.abilities_active__description
                : abil.type === 'use'
                  ? styles.abilities_use__description
                  : styles.abilities_passive__description;

            return (
              <div key={abil.description} className={abilityCondition}>
                <div className={abilityHeaderCondition}>
                  <div className={styles.abilities_active_passive__header__content}>
                    <span>{displayAbilityTypeCondition}:</span>
                    <span> {abil.title}</span>
                  </div>
                  <div className={styles.abilities_active_passive__header__manaAndCooldown}>
                    {renderAbilityCondition && details[item].mc ? (
                      <div
                        className={styles.abilities_active_passive__header__manaAndCooldown_image}
                      >
                        <Image
                          src="/pictures/dota-icons/ability-manacost.png"
                          alt=""
                          width={20}
                          height={20}
                        />
                        <span>{details[item].mc}</span>
                      </div>
                    ) : (
                      <></>
                    )}

                    {renderAbilityCondition && details[item].cd ? (
                      <div
                        className={styles.abilities_active_passive__header__manaAndCooldown_image}
                      >
                        <Image
                          src="/pictures/dota-icons/ability-cooldown.png"
                          alt=""
                          width={20}
                          height={20}
                        />
                        <span>{details[item].cd}</span>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className={abilityDescriptionCondition}>
                  <span dangerouslySetInnerHTML={{ __html: formattedDescription }} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
