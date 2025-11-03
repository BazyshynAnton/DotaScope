import { useDispatch } from 'react-redux';
import { MatchPageDispatch } from '@/features/matchPage/types';

export function useMatchPageDispatch() {
  return useDispatch.withTypes<MatchPageDispatch>();
}
