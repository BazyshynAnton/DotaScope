import { useSelector } from 'react-redux';
import { MatchPageRootState } from '@/features/matchPage/types';

export function useMatchPageSelector() {
  return useSelector<MatchPageRootState>((store) => store);
}
