import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { mmkvStorage } from '@utils/storage';
import { authReducer } from './auth';
import { appReducer } from './main';
import { baseApi } from './api/baseApi';

// Create MMKV storage adapter for redux-persist
const mmkvStorageAdapter = {
  getItem: (key: string): Promise<string | null> => {
    return Promise.resolve(mmkvStorage.getItem<string>(key) || null);
  },
  setItem: (key: string, value: string): Promise<void> => {
    mmkvStorage.setItem(key, value);
    return Promise.resolve();
  },
  removeItem: (key: string): Promise<void> => {
    mmkvStorage.removeItem(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: 'root',
  storage: mmkvStorageAdapter,
  whitelist: ['auth'], // Only persist auth state
};

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
