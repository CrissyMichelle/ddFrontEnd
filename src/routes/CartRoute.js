import React, { useContext, useState } from "react";
import DdashApi from "../api";
import { AuthContext } from "../components/AuthContext";
import { useCart } from "../components/CartContext";
import MealCard from "../components/MealCard";
import { Link } from "react-router-dom";
import './CartRoute.css';

function CartRoute() {
    const { currentUser } = useContext(AuthContext);
    const { cartItems, removeFromCart, clearCart } = useCart();
    const [meals, setMeals] = useState(null);
    const [orderMeal, setOrderMeal] = useState(new Map());
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState(null);

    const handleSubmit = async (mealID, dfacID) => {
        if (!cartItems.length) {
            alert('Your cart is empty.');
            return;
        }

        if (orderMeal && orderMeal.has(mealID)) {
            console.log("Already ordered meal: ", mealID);
            return;
        }

        try {
            await DdashApi.addMealToOrder(currentUser.username, mealID, dfacID);
            clearCart();
        } catch (err) {
            console.error("Error placing order: ", err);
            setErrors(err.toString());
        }
    };

    return (
        <div>
            {errors && <p className="error">Error: {errors}</p>}
            {cartItems.length > 0 ? (
                <>
                    <ul>
                        {cartItems.map(meal => (
                            <li key={meal.mealID}>
                                <MealCard meal={meal} handleRemove={() => removeFromCart(meal.mealID)} />
                            </li>
                        ))}
                    </ul>
                    <button type="submit" onClick={handleSubmit}>Place Order</button>            
                </>
            ) : (
                <div className="cartP">
                    <p>Your cart is empty, how's your stomach doing? Add a meal and come back here to checkout!</p>
                    <Link to="/meals">
                        <button type="button" className="button">Browse Meals</button>
                    </Link>                  
                </div>
            )}
        </div>
    );
}

export default CartRoute;
