import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { 
  persistStore, 
  persistReducer,  
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
 } from 'redux-persist'
import productReducer from '../features/products/slice';
import CategoryReducer from '../features/categories/slice';
import OrderReducer from '../features/orders/slice';
import userReducer from '../features/user/slice';

import storage from 'redux-persist/lib/storage'
const persistConfig = {
  key: 'root',
  storage,
}

const persistedUserReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
  reducer: {
    products: productReducer,
    categories: CategoryReducer,
    orders: OrderReducer,
    user: persistedUserReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Enhanced store
export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
