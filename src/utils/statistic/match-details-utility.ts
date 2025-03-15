import type {
  GameMode,
  HeroList,
  League,
  MatchDetails,
  PicksAndBans,
  Region,
} from '@/types/statistic/match-data';
import type { MatchResult, PlayersByTeam, UMatchDetails } from '@/types/statistic/match-details';

/**
 * MatchDetailsUtility is an class that uses for setting
 * information that is not related to tables on statistic page.
 *
 * Implements the Singleton pattern.
 *
 * @class
 * @implements {UMatchDetails}
 */
export class MatchDetailsUtility implements UMatchDetails {
  /**
   * Retrieves the singleton instance of the MatchDetailsUtility class.
   * If an instance does not exist, it creates one.
   *
   * @returns {MatchDetailsUtility} The singleton instance of the class.
   */
  public static getInstance(): MatchDetailsUtility {
    if (!MatchDetailsUtility.instance) {
      MatchDetailsUtility.instance = new MatchDetailsUtility();
    }
    return MatchDetailsUtility.instance;
  }

  /**
   * Extracts and formats the match result from match details.
   *
   * This function takes the match details and formats
   * relevant information into a `MatchResult` object,
   * including the match outcome (radiant win),
   * the duration (converted from seconds to minutes), and
   * the scores for both the Radiant and Dire teams.
   *
   * @param {MatchDetails} matchDetails The details of the match,
   * including score, duration, and outcome.
   * @returns {MatchResult} The formatted match result,
   * including the match outcome, duration, and scores.
   */
  public findMatchResult(matchDetails: MatchDetails): MatchResult {
    const matchResult: MatchResult = {
      resultOfMatch: matchDetails.radiant_win,
      matchDuration: `${Math.floor(matchDetails.duration / 60)}:${(matchDetails.duration % 60).toString().padStart(2, '0')}`,
      radiantScore: matchDetails.radiant_score.toString(),
      direScore: matchDetails.dire_score.toString(),
    };

    return matchResult;
  }

  /**
   * Filters players into two teams (Radiant and Dire) based on the match details.
   *
   * This function takes the match details and separates
   * the players into two groups: one for the Radiant team
   * and one for the Dire team, based on the `isRadiant` flag.
   *
   * @param {MatchDetails} matchDetails The details of the match,
   * including a list of players.
   * @returns {PlayersByTeam} An object containing two arrays:
   * one for the Radiant team players and one for the Dire team players.
   */
  public filterPlayersByTeam(matchDetails: MatchDetails): PlayersByTeam {
    const playersRadiant = matchDetails.players.filter((player) => player.isRadiant);
    const playersDire = matchDetails.players.filter((player) => !player.isRadiant);

    return { playersRadiant, playersDire };
  }

  /**
   * Filters the picks and bans based on the team side (Radiant or Dire).
   *
   * This function takes the match details and filters the picks
   * and bans for either the Radiant or Dire team, depending on
   * the `side` parameter. It returns an array of picks and bans
   * for the specified team, or an error message if an invalid
   * side is provided.
   *
   * @param {string} side The team side, either "radiant" or "dire".
   * @param {MatchDetails} matchDetails The details of the match,
   * including picks and bans data.
   * @returns {PicksAndBans[] | string} An array of picks and
   * bans for the specified team side, or an error message
   * if the side is invalid.
   */
  public picksBans(side: string, matchDetails: MatchDetails): PicksAndBans[] | string {
    switch (side) {
      case 'radiant': {
        if (!matchDetails.picks_bans) return [];

        const radiantPicksBans = matchDetails.picks_bans.filter((el) => el.team == 0);
        return radiantPicksBans;
      }
      case 'dire': {
        if (!matchDetails.picks_bans) return [];

        const direPicksBans = matchDetails.picks_bans.filter((el) => el.team == 1);
        return direPicksBans;
      }
      default: {
        return 'error';
      }
    }
  }

  /**
   * Finds the hero's name in the pick/bans list based on their hero ID.
   *
   * This function iterates through the provided hero list
   * and checks for a matching hero ID. If a hero is found,
   * it returns the hero's name after removing the "npc_dota_hero_" prefix.
   * If hero is not found, the function returns `undefined`.
   *
   * @param {number} hero_id The unique ID of the hero to search for.
   * @param {HeroList[]} heroList The list of heroes to search within.
   * @returns {string | void} The formatted hero name if found,
   * or `undefined` if not found.
   */
  public findHeroInPickBans(hero_id: number, heroList: HeroList[]): void | string {
    for (let i = 0; i < heroList.length; ++i) {
      const hero = heroList[i];

      if (hero_id === hero.id) {
        return hero.name.replace('npc_dota_hero_', '');
      }
    }
  }

  /**
   * Finds the region by id.
   *
   * @param matchDetails The details of the match.
   * @param region The object of the regions.
   * @returns The region.
   */
  public findRegion(matchDetails: MatchDetails, region: Region): string {
    const temp = region[matchDetails.region];

    if (!temp) return '';

    const res = temp.toLowerCase().split('');
    res.forEach((el, idx) => {
      if (idx === 0) {
        return (res[idx] = res[idx].toUpperCase());
      }
      if (el === ' ') {
        return (res[idx + 1] = res[idx + 1].toUpperCase());
      }
    });
    return res.join('');
  }

  /**
   * Finds the game mode by id.
   *
   * @param matchDetails The details of the match.
   * @param gameMode The object of game modes.
   * @returns The game mode.
   */
  public findGameMode(matchDetails: MatchDetails, gameMode: GameMode): string {
    const temp =
      gameMode[matchDetails.game_mode].name.replace('game_mode_', '').replace('_', ' ') || '';

    if (!temp) return '';

    const res = temp.split('');
    for (let i = 0; i < res.length; ++i) {
      if (i === 0) res[i] = res[i].toUpperCase();
      if (res[i] === ' ') res[i + 1] = res[i + 1].toUpperCase();
    }

    return res.join('');
  }

  /**
   * Finds the league by id.
   *
   * @param matchDetails The details of the match.
   * @param leagues The array of leagues.
   * @returns The league.
   */
  public findLeague(matchDetails: MatchDetails, leagues: League[]): string {
    let res = '';

    leagues.some((league) => {
      if (matchDetails.leagueid !== 0 && matchDetails.leagueid === league.leagueid) {
        res = league.name;
        return true;
      }
    });

    return res;
  }

  private static instance: MatchDetailsUtility;
  private constructor() {}
}
