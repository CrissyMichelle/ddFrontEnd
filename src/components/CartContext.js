import React, { createContext, useContext, useState } from "react";

// Create a context for the Cart
const CartContext = createContext();

// Component that provides context to the children nested
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (meal) => {
        setCartItems(currentItems => [...currentItems, meal]);
    };

    const cartCount = () => {
        return cartItems.length;
    }

    const removeFromCart = (mealID) => {
        setCartItems(currentItems => currentItems.filter(item => item.mealID !== mealID));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, cartCount, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);
