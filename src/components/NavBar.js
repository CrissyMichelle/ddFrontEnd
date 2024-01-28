import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "./AuthContext";
import "./NavBar.css";
import logo from "../images/LL_Logo.png"
import divLogo from "../images/25IDlogo.png";
import healthLogo from "../images/H2F.jpeg";

function NavBar() {
    const { isLoggedIn, currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [isScreenSmall, setIsScreenSmall] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsScreenSmall(window.innerWidth < 768);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setIsActive(!isActive);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <nav>
            <div className="logo">
                <img src={logo} alt="logo" />
                <img src={divLogo} alt="logo" />
                <img src={healthLogo} alt="logo" />
            </div>
            <div className="nav-links">
                {isScreenSmall && (
                    <button className="hamburger-menu-button" onClick={toggleMenu}>
                        <div className={`hamburger-menu-icon ${isActive ? 'active' : ''}`}></div>
                    </button>
                )}
                {(isScreenSmall && isMenuOpen) || !isScreenSmall ? (
                    <>
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
                    </>
                ) : null}
            </div>
        </nav>
    );
}

export default NavBar;
