import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ProductsPage from './pages/ProductsPage';
import InventoryPage from './pages/InventoryPage';
import Navbar from './components/Navbar';
import NotificationsPage from './pages/NotificationsPage';
import InventoryMovementsTable from './pages/InventoryMovementsTable';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/inventory/:id" element={<InventoryPage />} />
          <Route path="/notifications" element={<NotificationsPage />} /> 
          <Route path="/inventory-movements" element={<InventoryMovementsTable />} /> 
          <Route path="*" element={<ProductsPage />} />
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </Provider>
  );
}

export default App;
