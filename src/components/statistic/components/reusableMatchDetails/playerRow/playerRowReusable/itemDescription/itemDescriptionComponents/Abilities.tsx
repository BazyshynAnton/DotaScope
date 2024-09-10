import { Image } from "@/shared/nextjsImports"

import type { ItemDescriptionInterface } from "@/types/statistic/playerRow"

import styles from "@/styles/statistic/ItemDescription.module.scss"

export default function Abilities({ details, item }: ItemDescriptionInterface) {
  //
  // Check for existence
  if (!details) {
    throw new Error("[DATA] Cannot get data about Item Details")
  }

  return (
    <>
      {details[item].abilities && (
        <div className={styles.tooltip__description__abilities}>
          {details[item].abilities.map((abil) => {
            //
            // Format description from JSON file:
            // replace all "\n" symbols to <br/>
            // for using in HTML
            const formattedDescription = abil.description.replace(
              /\n/g,
              "<br/>"
            )

            const abilityCondition =
              abil.type === "active"
                ? styles.tooltip__description__abilities_active
                : abil.type === "use"
                ? styles.tooltip__description__abilities_use
                : styles.tooltip__description__abilities_passive

            const abilityHeaderCondition =
              abil.type === "active"
                ? styles.tooltip__description__abilities_active__header
                : abil.type === "use"
                ? styles.tooltip__description__abilities_use__header
                : styles.tooltip__description__abilities_passive__header

            const displayAbilityTypeCondition =
              abil.type === "active"
                ? "Active"
                : abil.type === "use"
                ? "Use"
                : "Passive"

            const renderAbilityCondition =
              abil.type === "active" || abil.type === "use"

            const abilityDescriptionCondition =
              abil.type === "active"
                ? styles.tooltip__description__abilities_active__description
                : abil.type === "use"
                ? styles.tooltip__description__abilities_use__description
                : styles.tooltip__description__abilities_passive__description

            return (
              <div key={abil.title} className={abilityCondition}>
                <div className={abilityHeaderCondition}>
                  <div
                    className={
                      styles.tooltip__description__abilities_active_passive__header__content
                    }
                  >
                    <span>{displayAbilityTypeCondition}:</span>
                    <span> {abil.title}</span>
                  </div>
                  <div
                    className={
                      styles.tooltip__description__abilities_active_passive__header__manaAndCooldown
                    }
                  >
                    {renderAbilityCondition && details[item].mc ? (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Image
                          src="/pictures/dotaIcons/ability_manacost.png"
                          alt=""
                          width={20}
                          height={20}
                        />
                        <span
                          style={{
                            color: "#ffffffde",
                            fontWeight: "400",
                            letterSpacing: "0px",
                            paddingLeft: "3px",
                            fontSize: "1rem",
                          }}
                        >
                          {details[item].mc}
                        </span>
                      </div>
                    ) : (
                      <></>
                    )}

                    {renderAbilityCondition && details[item].cd ? (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Image
                          src="/pictures/dotaIcons/ability_cooldown.png"
                          alt=""
                          width={20}
                          height={20}
                        />
                        <span
                          style={{
                            color: "#ffffffde",
                            fontWeight: "400",
                            letterSpacing: "0px",
                            paddingLeft: "3px",
                            fontSize: "1rem",
                          }}
                        >
                          {details[item].cd}
                        </span>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className={abilityDescriptionCondition}>
                  <span
                    dangerouslySetInnerHTML={{ __html: formattedDescription }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
