import matchPageSlice from './match-page-slice';
import { configureStore } from '@reduxjs/toolkit';

export const makeStore = () => {
  return configureStore({
    reducer: { matchPageSlice },
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare({ serializableCheck: false }),
  });
};
