import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import { CartProvider, useCart } from './components/CartContext';
import AuthRoute from './routes/AuthRoute';
import NavBar from './components/NavBar';
import HomeRoute from './routes/HomeRoute';
import DfacsRoute from './routes/DfacsRoute';
import MealsRoute from './routes/MealsRoute';
import MealList from './components/MealList';
import CustomerSignUp from './routes/CustomerSignUp';
import CookSignUp from './routes/CookSignUp';
import CartRoute from './routes/CartRoute';
import CustomerProfile from './components/CustomerProfile';
import OrderHistory from './routes/OrderHistory';
import OrdersList from './routes/OrdersList';
import Disclaimer from './components/Disclaimer';
import GoogleMap from './components/GoogleMap';
import GoogleMaps from './routes/GoogleMaps';


function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
            <Disclaimer />
            <NavBar />
            <Routes>
              <Route path="/auth/customer/login" element={<AuthRoute />} />
              <Route path="/" element={<HomeRoute />} />
              <Route path="/auth/dfacs" element={<DfacsRoute />} />
              <Route path="/meals" element={<MealsRoute />} />
              <Route path="/meals/dfac/:dfacID" element={<MealList />} />
              <Route path="/auth/register/customer" element={<CustomerSignUp />} />
              <Route path="/auth/register/92G" element={<CookSignUp />} />
              <Route path="/cart" element={<CartRoute />} />
              <Route path="/customer/profile" element={<CustomerProfile />} />
              <Route path="/orders/customer/:customerID" element={<OrderHistory />} />
              <Route path="/orders" element={<OrdersList />} />
              <Route path="/GoogleMaps" element={<GoogleMap />} />
            </Routes>
        </Router>
      </CartProvider>      
      </AuthProvider>
  );
}

export default App;
