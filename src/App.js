import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import AuthRoute from './routes/AuthRoute';
import NavBar from './components/NavBar';
import HomeRoute from './routes/HomeRoute';
import DfacsRoute from './routes/DfacsRoute';
import MealsRoute from './routes/MealsRoute';
import MealList from './components/MealList';

function App() {
  return (
    <AuthProvider>
      <Router>
          <NavBar />
          <Routes>
            <Route path="/auth/customer/login" element={<AuthRoute />} />
            <Route path="/" element={<HomeRoute />} />
            <Route path="/auth/dfacs" element={<DfacsRoute />} />
            <Route path="/meals" element={<MealsRoute />} />
            <Route path="/meals/dfac/:dfacID" element={<MealList />} />
          </Routes>
        </Router>
      </AuthProvider>
  );
}

export default App;
