import MatchHeader from '@/features/matchPage/components/ui/MatchHeader/MatchHeader';
import StoreProvider from '@/features/matchPage/providers/MatchPageStoreProvider';
import MatchNotFoundError from '@/features/matchPage/components/ui/MatchNotFoundError/MatchNotFoundError';
import { useMatchPageDispatch } from '@/features/matchPage/hooks/useMatchPageDispatch';
import { useMatchPageSelector } from '@/features/matchPage/hooks/useMatchPageSelector';
import { setMatchPageData, setDotaConstants } from '@/features/matchPage/store/match-page-slice';
import type { Match, DotaConstants, MatchPageSlice } from '@/features/matchPage/types';

export {
  MatchHeader,
  StoreProvider,
  MatchNotFoundError,
  useMatchPageDispatch,
  useMatchPageSelector,
  setMatchPageData,
  setDotaConstants,
  type Match,
  type DotaConstants,
  type MatchPageSlice,
};
