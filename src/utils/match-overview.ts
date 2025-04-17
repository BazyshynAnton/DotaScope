import type { GameMode, Hero, League, Match, PicksAndBans, Region } from '@/types/matches-page';
import type { MatchResult, PlayersByTeam, CMatchOverview } from '@/types/matches-page';

export class MatchOverview implements CMatchOverview {
  public static getInstance(): MatchOverview {
    if (!MatchOverview.instance) {
      MatchOverview.instance = new MatchOverview();
    }
    return MatchOverview.instance;
  }

  public findMatchResult(match: Match): MatchResult {
    const matchResult: MatchResult = {
      result: match.radiant_win,
      duration: `${Math.floor(match.duration / 60)}:${(match.duration % 60).toString().padStart(2, '0')}`,
      radiantScore: match.radiant_score.toString(),
      direScore: match.dire_score.toString(),
    };

    return matchResult;
  }

  public filterPlayersByTeam(match: Match): PlayersByTeam {
    const radiant = match.players.filter((player) => player.isRadiant);
    const dire = match.players.filter((player) => !player.isRadiant);

    return { radiant, dire };
  }

  public picksBans(match: Match, side: string): PicksAndBans[] | string {
    switch (side) {
      case 'radiant': {
        if (!match.picks_bans) return [];

        const radiant = match.picks_bans.filter((el) => el.team === 0);
        return radiant;
      }
      case 'dire': {
        if (!match.picks_bans) return [];

        const dire = match.picks_bans.filter((el) => el.team === 1);
        return dire;
      }
      default: {
        return 'pickBans function call failed';
      }
    }
  }

  public findHeroInPickBans(heroes: Hero[], heroId: number): void | string {
    for (let i = 0; i < heroes.length; ++i) {
      const hero = heroes[i];

      if (heroId === hero.id) {
        return hero.name.replace('npc_dota_hero_', '');
      }
    }
  }

  public findRegion(match: Match, region: Region): string {
    const currRegion = region[match.region];

    if (!currRegion) return '';

    const resultedRegion = currRegion.toLowerCase().split('');
    resultedRegion.forEach((el, idx) => {
      if (idx === 0) {
        return (resultedRegion[idx] = resultedRegion[idx].toUpperCase());
      }
      if (el === ' ') {
        return (resultedRegion[idx + 1] = resultedRegion[idx + 1].toUpperCase());
      }
    });
    return resultedRegion.join('');
  }

  public findGameMode(match: Match, gameMode: GameMode): string {
    const currMode =
      gameMode[match.game_mode].name.replace('game_mode_', '').replace('_', ' ') || '';

    if (!currMode) return '';

    const resultedMode = currMode.split('');
    for (let i = 0; i < resultedMode.length; ++i) {
      if (i === 0) resultedMode[i] = resultedMode[i].toUpperCase();
      if (resultedMode[i] === ' ') resultedMode[i + 1] = resultedMode[i + 1].toUpperCase();
    }

    return resultedMode.join('');
  }

  public findLeague(match: Match, leagues: League[]): string {
    let resultedLeague = '';

    leagues.some((league) => {
      if (match.leagueid !== 0 && match.leagueid === league.leagueid) {
        resultedLeague = league.name;
        return true;
      }
    });

    return resultedLeague;
  }

  private static instance: MatchOverview;
  private constructor() {}
}
