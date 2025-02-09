// src/store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import inventoryReducer from '../features/inventory/inventorySlice';
import notificationsReducer from '../features/notifications/notificationsSlice';

const rootReducer = combineReducers({
  products: productsReducer,
  inventory: inventoryReducer,
  notifications: notificationsReducer,
});

export default rootReducer;
