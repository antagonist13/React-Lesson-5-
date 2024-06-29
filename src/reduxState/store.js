import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { currencySlice } from './slice';

const persistConfig = {
  key: "currency",
  storage,
  whitelist: ["baseCurrency"],
};
const persistedCurrencyReducer = persistReducer(persistConfig, currencySlice.reducer);

    export const store = configureStore({
  reducer: {
    [currencySlice.name]: persistedCurrencyReducer,
      },
      middleware: getDefaultMiddleware => 
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          }
        })
    });

  export const persistor = persistStore(store);