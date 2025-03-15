import type { UAbilityDetails } from '@/types/statistic/ability-details';

/**
 * AbilityDetailsUtility is an class that uses for setting
 * information in `TableAbilities.tsx`.
 *
 * Implements the Singleton pattern.
 *
 * @class
 * @implements {UAbilityDetails}
 */
export class AbilityDetailsUtility implements UAbilityDetails {
  /**
   * Retrieves the singleton instance of the AbilityDetailsUtility class.
   * If an instance does not exist, it creates one.
   *
   * @returns {AbilityDetailsUtility} The singleton instance of the class.
   */
  public static getInstance(): AbilityDetailsUtility {
    if (!this.instance) {
      this.instance = new AbilityDetailsUtility();
    }

    return this.instance;
  }

  /**
   * Finds an ability name in object by ID.
   *
   * @param {number} id The ID of the ability.
   * @param {any} abilityIDs The object.
   * @returns {string} The name of the ability if found, otherwise "none".
   */
  public findAbilityKey(id: number, abilityIDs: any): string {
    return abilityIDs[id] ? abilityIDs[id] : 'none';
  }

  /**
   * Finds real name of ability in object by key.
   *
   * @param {string} abilityKey The key representing the ability in the JSON file.
   * @param {any} abilities The object.
   * @returns {string} The real name of the ability if found, otherwise "unnamed".
   */
  public findAbilityRealName(abilityKey: string, abilities: any): string {
    return abilities[abilityKey] ? abilities[abilityKey].dname : 'unnamed';
  }

  /**
   * Sets abilities to the appropriate hero levels
   * based on the given upgrades array.
   *
   * This method maps an array of ability upgrades
   * to a hero's 25 levels, following specific rules:
   * - Levels before index 16 are mapped directly.
   * - Special levels at indices (16, 17, 19, and 24) follow unique mapping logic.
   * - Other levels are initialized to `-1`.
   *
   * @param {number[]} abilityUpgradesArr - An array representing ability upgrades to map to hero levels.
   * @returns {number[]} An array of length 25 where each index corresponds to the ability assigned at that level.
   */
  public setAbilityBuild(abilityUpgradesArr: number[]): number[] {
    const build = new Array(25).fill(-1);

    const enum patterns {
      FirstLevels = 16,
      CriticalLevel = 17,
      TreeLevel = 19,
      LastLevel = 24,
    }

    for (let i = 0; i < build.length; ++i) {
      if (i == patterns.FirstLevels) continue;

      if (i == patterns.CriticalLevel) {
        build[i] = abilityUpgradesArr[i - 1];
        continue;
      }

      if (i == patterns.TreeLevel) {
        build[i] = abilityUpgradesArr[i - 2];

        continue;
      }

      if (i == patterns.LastLevel) {
        build[i] = abilityUpgradesArr[i - 6];
        continue;
      }

      if (i < patterns.FirstLevels) {
        build[i] = abilityUpgradesArr[i];
        continue;
      }
    }
    return build;
  }

  /**
   * Finds ability behavior in object by key:
   * - target
   * - dmg_type
   * - bkbpierce
   * - dispellable
   *
   * @param {string} abilityKey The key representing the ability in the JSON file.
   * @param {any} abilities The object.
   * @returns {any} The ability behavior object:
   * `{
   *    target?: string,
   *    dmg_type?: string,
   *    bkbpierce?: string,
   *    dispellable?: string
   *  }`
   *
   */
  public findAbilityBehavior(abilityKey: string, abilities: any): any {
    const res = {
      target: '',
      dmg_type: '',
      bkbpierce: '',
      dispellable: '',
    };

    if (Array.isArray(abilities[abilityKey].behavior)) {
      let length = abilities[abilityKey].behavior.length;
      for (let i = 0; i < length; ++i) {
        res.target += abilities[abilityKey].behavior[i];
        if (i < length - 1) {
          res.target += ' / ';
        }
      }
    } else if (typeof abilities[abilityKey].behavior === 'string') {
      res.target = abilities[abilityKey].behavior;
    }

    res.bkbpierce = abilities[abilityKey].bkbpierce;

    res.dmg_type = abilities[abilityKey].dmg_type;

    res.dispellable = abilities[abilityKey].dispellable;

    return res;
  }

  /**
   * Finds an ability description in object by key.
   *
   * @param {string} abilityKey The key representing the ability in the JSON file.
   * @param {any} abilities The object.
   * @returns {string} The description of the ability if found, otherwise "".
   */
  public findAbilityDescription(abilityKey: string, abilities: any): string {
    return abilities[abilityKey] ? abilities[abilityKey].desc : '';
  }

  /**
   * Finds an ability attributes in object by key.
   *
   * @param {string} abilityKey The key representing the ability in the JSON file.
   * @param {any} abilities The object.
   * @returns {any} The array of objects that represent attributes:
   * `[{
   *    header: string,
   *    value: string
   *  }, ...]`
   */
  public findAbilityAttributes(abilityKey: string, abilities: any): any {
    const res: any = [];

    const attrib = abilities[abilityKey].attrib;
    for (let i = 0; i < attrib.length; ++i) {
      const attribData = {
        header: attrib[i].header,
        value: '',
      };

      const value = attrib[i].value;

      if (Array.isArray(value)) {
        for (let j = 0; j < value.length; ++j) {
          attribData.value += value[j];
          if (j < value.length - 1) {
            attribData.value += ' / ';
          }
        }
      } else if (typeof value === 'string') {
        attribData.value = value;
      }

      res.push(attribData);
    }

    return res;
  }

  /**
   * Finds an ability mana cost and cooldown in object by key.
   *
   * @param {string} abilityKey The key representing the ability in the JSON file.
   * @param {any} abilities The object.
   * @returns {any} The mana cost and/or cooldown of the ability:
   * `{
   *    mc: string,
   *    cd: string
   *  }`
   */
  public findAbilityCost(abilityKey: string, abilities: any): any {
    const cost = {
      mc: '',
      cd: '',
    };

    if (Array.isArray(abilities[abilityKey].mc)) {
      const length = abilities[abilityKey].mc.length;
      for (let i = 0; i < length; ++i) {
        cost.mc += abilities[abilityKey].mc[i];
        if (i < length - 1) {
          cost.mc += ' / ';
        }
      }
    } else if (typeof abilities[abilityKey].mc === 'string') {
      cost.mc = abilities[abilityKey].mc;
    }

    if (Array.isArray(abilities[abilityKey].cd)) {
      const length = abilities[abilityKey].cd.length;
      for (let i = 0; i < length; ++i) {
        cost.cd += abilities[abilityKey].cd[i];
        if (i < length - 1) {
          cost.cd += ' / ';
        }
      }
    } else if (typeof abilities[abilityKey].cd === 'string') {
      cost.cd = abilities[abilityKey].cd;
    }

    return cost;
  }

  private static instance: AbilityDetailsUtility;
  private constructor() {}
}
