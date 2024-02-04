import React, { useContext, useState } from "react";
import DdashApi from "../api";
import { AuthContext } from "../components/AuthContext";
import { CartContext } from "../components/CartContext";
import MealCard from "../components/MealCard";

function CartRoute() {
    const { currentUser } = useContext(AuthContext);
    const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
    const [meals, setMeals] = useState(null);
    const [orderMeal, setOrderMeal] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState(null);

    const handleSubmit = async (mealID, dfacID) => {
        if (!cartItems.length) {
            alert('Your cart is empty.');
            return;
        }

        if (orderMeal.has(mealID)) {
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
            <ul>
                {cartItems.map(meal => (
                    <li key={meal.mealID}>
                        <MealCard meal={meal} handleRemove={() => removeFromCart(meal.mealID)} />
                    </li>
                ))}
            </ul>
            <button type="submit" onClick={handleSubmit}>Place Order</button>
        </div>
    );
}

export default CartRoute;
