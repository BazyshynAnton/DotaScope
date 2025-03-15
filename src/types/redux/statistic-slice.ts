import type {
  GameMode,
  HeroList,
  League,
  LobbyType,
  MatchDetails,
  PlayerProfile,
  Region,
} from '../statistic/match-data';
import type { Items } from '../statistic/player-row';

export interface InitialStatisticState {
  matchDetails: MatchDetails | null;
  heroList: HeroList[] | null;
  playersProfiles: PlayerProfile[] | null;

  abilities: any | null;
  heroAbilities: any | null;
  abilityIDs: any | null;
  items: Items | null;
  region: Region | null;
  gameMode: GameMode | null;
  lobbyType: LobbyType | null;
  leagues: League[] | null;

  isTableDataExist: boolean;
  tooltipAbilityPortal: boolean;
  tableLoading: boolean;

  search: {
    [key: string]: string;
  };

  error: string | null;
}
