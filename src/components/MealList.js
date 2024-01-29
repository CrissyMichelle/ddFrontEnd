import React, { useState, useContext, useEffect } from "react";
import MealCard from "./MealCard";
import { useLocation } from "react-router-dom";
import DdashApi from "../api";

function MealList( { handleOrder }) {
    const location = useLocation();
    const stateDfac = location.state?.dfacDetails;
    const stateMeals = location.state?.meals;
    const [meals, setMeals] = useState(stateMeals || []);

    console.log("DFAC from state: ", stateDfac, " Meals from state: ", stateMeals);

    useEffect(() => {
        // If meals are not passed through the state, fetch meals from API
        if (!stateMeals) {
            const fetchMeals = async () => {
                try {
                    const fetchedMeals = await DdashApi.getMeals();
                    setMeals(fetchedMeals);
                } catch (err) {
                    console.error("Error fetching meals data: ", err);
                }
            };

            fetchMeals();
        }
    }, [stateMeals]);

    if(!stateMeals || !Array.isArray(stateMeals) || stateMeals.length === 0) {
        return <div>No meals available or data passed incorrectly.</div>;
    }

    return (
        <ul>
            {meals.map((meal) => (
                <MealCard
                    key={meal.mealID}
                    meal={meal}
                    dfac={stateDfac}
                    handleOrder={handleOrder}
                />
            ))}
        </ul>
    );
}

export default MealList;
