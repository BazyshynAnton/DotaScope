import { useSelector } from 'react-redux';
import { MatchPageRootState } from '@/features/matchPage/types';

export function useMatchPageSelector<T>(callback: (store: MatchPageRootState) => T) {
  return useSelector<MatchPageRootState>(callback) as T;
}
