import { configureStore } from '@reduxjs/toolkit';
import productsSlice from '../features/products/productsSlice';
import inventorySlice from '../features/inventory/inventorySlice';
import notificationsSlice from '../features/notifications/notificationsSlice';

export const store = configureStore({
  reducer: {
    products: productsSlice,
    inventory: inventorySlice,
    notifications: notificationsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
