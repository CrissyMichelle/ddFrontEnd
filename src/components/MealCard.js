import React from "react";
import { Link } from "react-router-dom";

function MealCard( { meal, handleOrder, hasOrdered }) {
    return (
        <li>
            <h3>
                <b>{meal.mealName}</b> at 
                <Link to={`/auth/${meal.dfacID}`}>{meal.dfacName}</Link>
            </h3>
            <img src={meal.imgPic} alt={`Meal: ${meal.mealName}`} />
            <p>{meal.description}</p>
            <ul>
             {meal.items.map((item, index) => (
                <React.Fragment key={index}>
                    <li>{item.menuItem}</li>
                    <li>Performance level: {item.colorCode}</li>
                    <li>Sodium level: {item.sodiumLvl}</li>
                </React.Fragment>
             ))}   
            </ul>
            <button
                onClick={() => handleOrder(meal.mealID)}
                disabled={hasOrdered}
            >
                {hasOrdered ? "Added to cart!" : "Add to order"}
            </button>
        </li>
    );
}

export default MealCard;
