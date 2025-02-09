// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './store/store';
import ProductsPage from './pages/ProductsPage';
/* import ProductsPage from './features/products/ProductsPage';
import InventoryPage from './features/inventory/InventoryPage';
import NotificationsPage from './features/notifications/NotificationsPage'; */
/* import Navbar from './components/Navbar'; */

function App() {
  return (
    <Provider store={store}>
      
        <Router>
          {/* <Navbar /> */}
          <Routes>
            <Route path="/products" element={<ProductsPage />} />
            {/* <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/notifications" element={<NotificationsPage />} /> */}
            <Route path="*" element={<ProductsPage />} />
          </Routes>
        </Router>
    </Provider>
  );
}

export default App;
