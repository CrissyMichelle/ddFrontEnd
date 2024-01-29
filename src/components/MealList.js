import React, { useState, useContext } from "react";
import MealCard from "./MealCard";
import DdashApi from "../api";

function MealList( { meals, handleOrder, orderedMeal }) {

    return (
        <ul>
            {meals.map((meal) => (
                <MealCard
                    key={meal.mealID}
                    meal={meal}
                    handleOrder={handleOrder}
                    orderedMeal={orderedMeal.has(meal.mealID)}
                />
            ))}
        </ul>
    );
}

export default MealList;
