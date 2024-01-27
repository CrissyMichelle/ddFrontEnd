import React from 'react';
import './App.css';
import culinaryImg from './images/culinary1.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2><i>Welcome to dfac Dash</i></h2>
        <h1>Passionate about good food and service</h1>
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
    </div>
  );
}

export default App;
