import React from 'react';
import { useAuth } from '../components/AuthContext';
import './HomeRoute.css';
import culinaryImg from '../images/culinary1.png';

function HomeRoute() {
    const { isLoggedIn, currentUser } = useAuth();

    return (
        <div className="Home">
            <header className="Home-header">
                <h2><i>Welcome to dfac Dash</i></h2>
                <h1>Passionate about good food and pro service</h1>
                <img src={culinaryImg} className="Home-logo" alt="logo" />
                <p>
                </p>
                <a
                  className="Home-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Menus
                </a>
            </header>
        </div>
    );
}

  /* <p>
          <i>About DFACdash</i><br></br>

          The meal prep program was started by a group of food service culinarians who
          who wanted to solve the customer problem on Schofield Barracks of getting the
          right meal with the right nutrition using a Soldier's meal card to supplement
          their lifestyle.
    </p> */

export default HomeRoute;
