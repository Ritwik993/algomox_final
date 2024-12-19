import { combineReducers, configureStore } from "@reduxjs/toolkit";
import CategorySlice from "../utils/CategorySlice";
import userSlice from "../utils/userSlice";
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
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage,
};

// Wrapping reducers with persistReducer
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    categorySlice: CategorySlice,
    user: userSlice,
  })
);

// Configuring the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Creating the persistor
export const persistor = persistStore(store);
