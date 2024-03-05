import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import DdashApi from "../api";

// create authentication context for managing auth State throughout the app
// define and export AuthContext in one step
export const AuthContext = createContext();

// AuthContext provides authentication value to child components
// components needing context nest inside the authentication context provider
export const AuthProvider = ({ children }) => {
    console.log("Initial token from localStorage: ", localStorage.getItem('authToken'));
    console.log("Initial username from localStorage: ", localStorage.getItem('username'));
    const [token, setToken] = useState(localStorage.getItem('authToken') || null);
    const [currentUser, setCurrentUser] = useState(localStorage.getItem('username') || '');

    // updating the token state causes the following effect
    // decodes the user's token and enables authentication
    useEffect(() => {
        DdashApi.token = token;

        try {
            if (token) {
                const user = jwtDecode(token);
                console.log("Decoded user from token: ", user);
                setCurrentUser(user.username);
            } else setCurrentUser('');
        } catch (err) {
            console.error("Error decoding token: ", err);
            setCurrentUser(null);
        }
    }, [token]);

    function signup(newToken) {
        setToken(newToken);
    }

    function login(newToken) {
        const user = jwtDecode(newToken);
        console.log("Decoded user from token: ", user);
        localStorage.setItem('authToken', newToken);
        localStorage.setItem('username', user.username);

        setToken(newToken);
        setCurrentUser(user.username);
        console.log("Current user set to: ", user.username);

        DdashApi.token = newToken;
    }

    function logout() {
        console.log("User logging out: ", currentUser);
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');

        setToken(null);
        setCurrentUser('');
    }

    // if !token is false then the user must be logged in
    // a valid token in token state means an authenticated user logged in
    const isLoggedIn = !(!token);

    // contextValue object contains all the necessary authentication provision properties
    const contextValue = {
        signup, token, setToken, currentUser, isLoggedIn, login, logout
    };

    /** returning the AuthContext.Provider component, a special React component
    *  that allows props to be passed down to all of the child components
    *  nested inside the provider.
    * 
    * Any child components inside the authentication context can access the auth
    * methods and state passed in the `value` property
    * 
    * Essentially any part of the app placed inside the provider can verify 
    *  or set a user's token
    */ 
   console.log("AuthProvider context value: ", contextValue);
    return (
        <AuthContext.Provider value={{ signup, token, setToken, currentUser, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// convenient hook for accessing the authentication context
// useAuth simplifies the usage by giving components auth access without
// having to use `useContext(AuthContext)` directly every time
export const useAuth = () => useContext(AuthContext);
