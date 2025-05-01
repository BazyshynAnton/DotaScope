import { createSlice } from '@/shared/redux-imports';

import { MatchOverview } from '@/utils/match-overview';

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
            const matchOverview = MatchOverview.getInstance();
            state.matchData.playersByTeam = matchOverview.filterPlayersByTeam(
              state.matchData.match as Match
            );
          }
        }
      } else {
        state.error = action.payload;
      }
    },
    setDotaConstants: (state, action) => {
      if (typeof action.payload !== 'string') {
        state.constants = action.payload;
      } else {
        state.error = action.payload;
      }
    },
  },
});

export const { setMatchPageData, setDotaConstants } = matchPageSlice.actions;

export default matchPageSlice.reducer;
