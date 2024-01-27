import React, { createContext, useContext, useState, useEffect} from "react";
import { jwtDecode } from "jwt-decode";
import DdashApi from "../api";

// create authentication context for managing auth State throughout the app
// define and export AuthContext in one step
export const AuthContext = createContext();

// AuthContext provides authentication value to child components
// components needing context nest inside the authentication context provider
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('authToken') || null);
    const [currentUser, setCurrentUser] = useState(localStorage.getItem('usesrname') || '');
}