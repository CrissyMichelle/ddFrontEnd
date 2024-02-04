import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "./AuthContext";
import { useCart } from "./CartContext";
import "./NavBar.css";
import logo from "../images/LL_Logo.png"
import divLogo from "../images/25IDlogo.png";
import healthLogo from "../images/H2F.jpeg";

function NavBar() {
    const { isLoggedIn, currentUser, logout } = useAuth();
    const { cartCount } = useCart();
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
                <Link to='/'>
                    <img src={healthLogo} alt="logo" />
                </Link>
                
            </div>
            <div className="nav-links">
                {isScreenSmall && (
                    <button className="hamburger-menu-button" onClick={toggleMenu}>
                        <div className={`hamburger-menu-icon ${isActive ? 'active' : ''}`}></div>
                    </button>
                )}
                {(isScreenSmall && isMenuOpen) || !isScreenSmall ? (
                    <>
                        <Link to="/meals">Meals</Link>
                        <Link to="/auth/dfacs">DFACs</Link>
                        {isLoggedIn ? (
                            <>
                                <Link to="/profile">
                                    <span>Welcome, {currentUser}</span>
                                </Link>
                                <button onClick={handleLogout}>Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/auth/customer/login">Login</Link>           
                            </>
                        )}
                        <Link to="/cart">Cart ({cartCount()})</Link>
                    </>
                ) : null}
            </div>
        </nav>
    );
}

export default NavBar;
