import { createSlice } from '@reduxjs/toolkit';
import { filterPlayersByTeam } from '@/features/matchPage/utils/find-players-by-team';
import type { MatchPageSlice } from '@/features/matchPage/types';

const initialState: MatchPageSlice = {
  matchData: null,
  constants: null,

  error: null,
};

const matchPageSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    setMatchPageData: (state, action) => {
      if (typeof action.payload !== 'string') {
        if (state.matchData?.match.match_id !== action.payload.match.match_id) {
          state.error = action.payload.match.patch < 55 ? 'Unsupported Dota 2 version' : null;

          state.matchData = !state.error ? action.payload : null;

          if (state.matchData && typeof state.matchData !== 'string') {
            state.matchData.playersByTeam = filterPlayersByTeam(state.matchData.match);
          }
        }
      } else {
        state.error = action.payload;
      }
    },
    // setDotaConstants: (state, action) => {
    //   if (typeof action.payload !== 'string') {
    //     state.constants = action.payload;
    //   } else {
    //     state.error = action.payload;
    //   }
    // },
  },
});

export const { setMatchPageData } = matchPageSlice.actions;

export default matchPageSlice.reducer;
