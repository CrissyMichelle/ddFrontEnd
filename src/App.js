import React from 'react';
import './App.css';
import culinaryImg from './images/culinary1.png';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import AuthRoute from './routes/AuthRoute';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2><i>Welcome to dfac Dash</i></h2>
        <h1>Passionate about good food and pro service</h1>
        <img src={culinaryImg} className="App-logo" alt="logo" />
        <p>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Menus
        </a>
      </header>
      {/* <p>
          <i>About DFACdash</i><br></br>

          The meal prep program was started by a group of food service culinarians who
          who wanted to solve the customer problem on Schofield Barracks of getting the
          right meal with the right nutrition using a Soldier's meal card to supplement
          their lifestyle.
        </p> */}
      <AuthProvider>
        <Router>
        <Link to="/auth/customer/login">Go to Auth Route</Link>
          <Routes>
            <Route path="/auth/customer/login" element={<AuthRoute />} />
            
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
