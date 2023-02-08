import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productReducer from '../features/products/slice';
import CategoryReducer from '../features/categories/slice';
import OrderReducer from '../features/orders/slice';
import userReducer from '../features/user/slice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    categories: CategoryReducer,
    orders: OrderReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
