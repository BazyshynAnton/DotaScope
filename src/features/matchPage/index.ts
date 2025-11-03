import MatchHeader from '@/features/matchPage/components/ui/MatchHeader';
import StoreProvider from '@/features/matchPage/providers/MatchPageStoreProvider';
import { useMatchPageDispatch } from '@/features/matchPage/hooks/useMatchPageDispatch';
import { useMatchPageSelector } from '@/features/matchPage/hooks/useMatchPageSelector';
import { setMatchPageData } from '@/features/matchPage/store/match-page-slice';
import { Match } from '@/features/matchPage/types';

export {
  MatchHeader,
  StoreProvider,
  useMatchPageDispatch,
  useMatchPageSelector,
  setMatchPageData,
  type Match,
};
