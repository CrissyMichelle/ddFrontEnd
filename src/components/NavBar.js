import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "./AuthContext";

function NavBar() {
    const { isLoggedIn, currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <nav>
            <Link to="/">About</Link>
            <Link to="/auth/dfacs">DFacs</Link>
            <Link to="/">Contact</Link>
            {isLoggedIn ? (
                <>
                    <Link to="/profile">Profile</Link>
                    <span>Welcome, {currentUser}</span>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/auth/customer/login">Customer login</Link>
                    <Link to="/auth/92G/login">Culinarians login</Link>
                    <Link to="/auth/register/customer">Sign up</Link>
                </>
            )}
        </nav>
    );
}

export default NavBar;
