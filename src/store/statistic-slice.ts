import { createSlice } from '@/shared/redux-imports';
import type { InitialStatisticState } from '@/types/redux/statistic-slice';

const initialState: InitialStatisticState = {
  matchDetails: null,
  heroList: null,
  playersProfiles: null,

  abilities: null,
  heroAbilities: null,
  abilityIDs: null,
  items: null,
  region: null,
  gameMode: null,
  lobbyType: null,
  leagues: null,

  tooltipAbilityPortal: false,
  isTableDataExist: false,
  tableLoading: false,

  search: {
    accountID: '',
    matchID: '',
  },

  error: null,
};

export const statisticSlice = createSlice({
  name: 'statistic',
  initialState,
  reducers: {
    setMatchData: (state, action) => {
      if (typeof action.payload !== 'string') {
        if (state.matchDetails?.match_id !== action.payload.matchDetailsData?.match_id) {
          // check patch
          state.error =
            action.payload.matchDetailsData.patch < 55 ? 'unsupported Dota2 version' : null;

          if (!state.error) {
            state.matchDetails = action.payload.matchDetailsData;
            state.playersProfiles = action.payload.playerProfilesData;
          }
        }
      } else {
        state.error = action.payload;
      }
    },

    setDotaConstants: (state, action) => {
      if (typeof action.payload !== 'string') {
        state.heroList = action.payload.heroListData;
        state.abilities = action.payload.abilitiesData;
        state.heroAbilities = action.payload.heroAbilitiesData;
        state.abilityIDs = action.payload.abilityIDsData;
        state.items = action.payload.itemsData;
        state.region = action.payload.regionData;
        state.gameMode = action.payload.gameModeData;
        state.lobbyType = action.payload.lobbyTypeData;
        state.leagues = action.payload.leaguesData;

        state.error = null;
      } else {
        state.error = action.payload;
      }
    },

    setTooltipAbilityPortal: (state, action) => {
      state.tooltipAbilityPortal = action.payload;
    },

    setIsTableDataExist: (state, action) => {
      state.isTableDataExist = action.payload;
    },

    setTableLoading: (state, action) => {
      state.tableLoading = action.payload;
    },

    setSearch: (state, action) => {
      state.search.matchID = action.payload.value;
    },
  },
});

export const {
  setMatchData,
  setDotaConstants,
  setSearch,
  setTooltipAbilityPortal,
  setIsTableDataExist,
  setTableLoading,
} = statisticSlice.actions;

export default statisticSlice.reducer;
