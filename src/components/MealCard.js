import React from "react";
import { Link } from "react-router-dom";

function MealCard( { meal, dfac, handleOrder, hasOrdered }) {
    //check if dfac data provided and set a flag
    const hasDfacData = dfac && dfac.dfacID && dfac.dfacName;

    return (
        <li className="meal-card">
            <h3>
                <b>{meal.mealName}</b><br></br>
                {hasDfacData && (
                    <>
                        {' available at '}
                        <Link to={`/auth/${dfac.dfacID}`}> {dfac.dfacName}</Link>
                    </>
                )}              
            </h3>
            <img src={meal.imgPic} alt={`Meal: ${meal.mealName}`} />
            <p>{meal.description}</p>
            {meal.items && Array.isArray(meal.items) && (
                <ul>
                 {meal.items.map((item, index) => (
                    <React.Fragment key={index}>
                        <li>{item.menuItem}</li>
                        <li>Performance level: {item.colorCode}</li>
                        <li>Sodium level: {item.sodiumLvl}</li>
                    </React.Fragment>
                 ))}   
                </ul>
            )}
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
