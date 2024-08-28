import { configureStore } from "@reduxjs/toolkit";
import baseApi from "./api/baseApi";
import authSlice from "./features/auth/authSlice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import slotSlice from "./features/slot/slotSlice";

const persistConfig = {
  key: "root",
  storage,
};

const authPersistedReducer = persistReducer(persistConfig, authSlice);

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authPersistedReducer,
    slot: slotSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;

export const persistor = persistStore(store);
