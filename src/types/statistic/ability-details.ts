export interface UAbilityDetails {
  findAbilityKey(id: number, abilityIDs: any): string;

  findAbilityRealName(abilityName: string, abilities: any): string;

  setAbilityBuild(abilityUpgradesArr: number[]): number[];

  findAbilityBehavior(abilityKey: string, abilities: any): any;

  findAbilityDescription(abilityKey: string, abilities: any): string;

  findAbilityAttributes(abilityKey: string, abilities: any): any;

  findAbilityCost(abilityKey: string, abilities: any): any;
}
