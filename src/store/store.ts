import matchesPageSlice from './matches-page-slice';

import { configureStore } from '@reduxjs/toolkit';

export const makeStore = () => {
  return configureStore({
    reducer: { matchesPageSlice },
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare({ serializableCheck: false }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
