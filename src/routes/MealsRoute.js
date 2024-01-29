import React, {useState, useEffect, useContext } from "react";
import DdashApi from "../api";
import MealList from "../components/MealList";
import { AuthContext } from "../components/AuthContext";

function MealsRoute() {
    const { currentUser } = useContext(AuthContext);
    const [meals, setMeals] = useState(null);
    // search and filter managed by a local state
    const [searchTerm, setSearchTerm] = useState("");
    const [itemsLike, setItemsLike] = useState("");
    const [orderMeal, setOrderMeal] = useState(null);
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
        fetchMeals();
    }, []);

    const handleOrder = async (mealID, dfacID) => {
        if (orderMeal.has(mealID)) {
            console.log("Already ordered meal: ", mealID);
            return;
        }

        try {
            await DdashApi.addMealToOrder(currentUser.username, mealID, dfacID);
            setOrderMeal(orderMeal, mealID);
        } catch (err) {
            console.error("Error placing order: ", err);
            setErrors(err);
        }
    };

    if (errors) return <p>Error loading meals.</p>
    if (isLoading) return <p>Loading meals... ...</p>

    return (
        <div>
            <h1>Meals</h1>
            <form onSubmit={handleSearch}>
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
            {meals && (
                <MealList 
                    meals={meals} 
                    orderedMeal={orderMeal} 
                    handleOrder={handleOrder}
                />
            )}
        </div>
    );
}

export default MealsRoute;
