import { configureStore } from "@reduxjs/toolkit";
import conversationSlice from "./conversationSlice";
import userSlice from "./userSlice";
import alertSlice from "./alertSlice";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }

const persistedReducer = persistReducer(persistConfig,userSlice)

export const store = configureStore({
    reducer:{
        user: persistedReducer,
        conversation : conversationSlice,
        alert: alertSlice
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)