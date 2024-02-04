import React, {useState, useEffect, useContext } from "react";
import DdashApi from "../api";
import MealList from "../components/MealList";
import { AuthContext, useAuth } from "../components/AuthContext";
import { useCart } from "../components/CartContext";
import MealCard from "../components/MealCard";
import "./MealsRoute.css";


function MealsRoute() {
    const { currentUser } = useAuth();
    const { addToCart, cartCount } = useCart();

    const [meals, setMeals] = useState(null);
    // search and filter managed by a local state
    const [searchTerm, setSearchTerm] = useState("");
    const [itemsLike, setItemsLike] = useState("");
    const [orderMeal, setOrderMeal] = useState(new Set());
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState(null);

    function handleSearch(event) {
        event.preventDefault();
        fetchMeals();
    };

    async function fetchMeals() {
        setIsLoading(true);

        try {
            const filters = { nameLike: searchTerm, itemsLike }

            const mealsData = await DdashApi.getMeals(filters);
            
            setMeals(mealsData);
            setIsLoading(false);
        } catch (err) {
            console.error("Error fetching meals data: ", err);
            setErrors(err);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log("MealsRoute - Current User: ", currentUser);
        fetchMeals();
    }, []);

    const handleOrder = (mealID, dfacID) => {
        console.log("Adding to cart meal: ", mealID, " from DFAC: ", dfacID);
        const mealToAdd = { mealID, dfacID };

        if (orderMeal && orderMeal.has(mealID)) {
            console.log("Already ordered meal: ", mealID);
            return;
        }

        addToCart(mealToAdd);
        console.log(`Cart now has ${cartCount()} meals.`);

        const updatedOrderedMeal = new Set(orderMeal).add(mealID);
        setOrderMeal(updatedOrderedMeal);      
    };

    const renderMeals = () => {
        if (!meals || !Array.isArray(meals) || meals.length === 0) {
            return <div>No meals available or data passed incorrectly.</div>;
        }

        return (
            <ul>
                {meals.map((meal) => (
                    <MealCard
                        key={meal.mealID}
                        meal={meal}
                        dfac={meal.dfacID}
                        handleOrder={handleOrder}
                        hasOrdered={orderMeal && orderMeal.has(meal.mealID)}
                    />
                ))}
            </ul>
        );
    };

    if (errors) return <p>Error loading meals.</p>
    if (isLoading) return <p>Loading meals... ...</p>

    return (
        <div className="meals-route-container">
            <h1>Meals</h1>
            <form onSubmit={handleSearch} className="meals-search-form">
                <input
                    type="text"
                    placeholder="Search meals by name"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Search meals by food item"
                    value={itemsLike}
                    onChange={e => setItemsLike(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            {renderMeals()}
        </div>
    );
}

export default MealsRoute;
