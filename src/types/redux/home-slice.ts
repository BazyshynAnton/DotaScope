import { DotaNews, ProMatch } from '../home/home-data';

export interface InitialHomeState {
  proMatches: ProMatch[] | null;
  dotaNews: DotaNews | null;
  isHomeDataExist: boolean;

  error: string | null;
}
