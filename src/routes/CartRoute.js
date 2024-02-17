import React, { useContext, useState } from "react";
import DdashApi from "../api";
import { AuthContext, useAuth } from "../components/AuthContext";
import { useCart } from "../components/CartContext";
import MealCard from "../components/MealCard";
import { Link, useNavigate } from "react-router-dom";
import './CartRoute.css';

function CartRoute() {
    const { currentUser } = useAuth();
    const { cartItems, removeFromCart, clearCart } = useCart();
    const navigate = useNavigate();
    const [meals, setMeals] = useState(null);
    const [orderMeal, setOrderMeal] = useState(new Map());
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState(null);

    const handleOrderSubmission = async () => {
        if (!cartItems.length) {
            alert('Your cart is empty.');
            return;
        }

        setIsLoading(true);

        for (const meal of cartItems) {
            try {
                console.log("Placing order for username: ", currentUser, " meal ", meal.mealID, " at dfac ", meal.dfacID)
                const user = await DdashApi.getCustomerDeets(currentUser);
                console.log("Customer's ID from their username: ",user.customerID, "DFAC ID from meal ID: ", meal.dfacID);

                await DdashApi.addMealToOrder(user.customerID, meal.mealID, meal.dfacID);
                alert('Your order has been placed!');
            } catch (err) {
                console.error("Error placing order: ", err);
                setErrors("You must log in to place an order.");
                break;
            }
        }
        clearCart();
        setIsLoading(false);        
    };

    const handleOrdersListNavigation = async () => {
        const user = await DdashApi.getCustomerDeets(currentUser);
        navigate(`/orders/customer/${user.customerID}`);
    };

    return (
        <div>
            {errors && <p className="error">Error: {errors}</p>}
            {cartItems.length > 0 ? (
                <div className="cart-content">
                    <ul className="cart-ul">
                        {cartItems.map(meal => (
                            <li key={meal.mealID}>
                                <MealCard meal={meal} isViewingCart={true} handleRemove={() => removeFromCart(meal.mealID)} />
                            </li>
                        ))}
                    </ul>
                    <button type="submit" onClick={handleOrderSubmission} className="button">Place Order</button>            
                </div>
            ) : (
                <div className="cartP">
                    <p>Your cart is empty, how's your stomach doing? Add a meal and come back here to checkout!</p>
                    <Link to="/meals">
                        <button type="button" className="button">Browse Meals</button>
                    </Link>
                        <button onClick={handleOrdersListNavigation}>View Order History</button>                 
                </div>
            )}
        </div>
    );
}

export default CartRoute;
