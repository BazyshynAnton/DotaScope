export interface MatchesPageData {
  proMatches: ProMatch[];
}

export interface ProMatch {
  match_id: number;
  duration: number;
  start_time: number;
  radiant_team_id: number;
  radiant_name: string;
  dire_team_id: number;
  dire_name: string;
  leagueid: number;
  league_name: string;
  series_id: number;
  series_type: number;
  radiant_score: number;
  dire_score: number;
  radiant_win: boolean;
  version: number;
}

export interface Team {
  team_id: number;
  rating: number;
  wins: number;
  losses: number;
  last_match_time: number;
  name: string;
  tag: string;
  logo_url: string;
}
