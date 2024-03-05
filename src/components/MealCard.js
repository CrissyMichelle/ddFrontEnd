import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useCart } from './CartContext';
import './MealCard.css';
import defaultMealImg from '../images/LunchNo1.jpg';

function MealCard( { meal, dfac, isViewingCart }) {
    const { addToCart, removeFromCart, cartItems } = useCart();

    // check if the meal is already in the cart
    const hasOrdered = cartItems.some(item => item.mealID === meal.mealID);

    //check if dfac data provided and set a flag
    const hasDfacData = dfac && dfac.dfacID && dfac.dfacName;

    const handleAddToCart = () => {
        addToCart(meal);
    };

    const handleRemoveFromCart = () => {
        removeFromCart(meal.mealID);
    };

    function getImageUrl(imgURL) {
        if (imgURL.includes('101cookingfortwo.com')) {
            return defaultMealImg;
        }
        return imgURL;
    }

    const mealImageURL = getImageUrl(meal.imgPic);

    return (
        <li className="meal-card">
            <h3>
                <b>{meal.mealName}</b><br />
                {hasDfacData && (
                    <>
                        {' available at: '}
                        {/* DFAC pages awaiting development...
                        <Link to={`/auth/${dfac.dfacID}`}> {dfac.dfacName}</Link> */}
                        <span className="under-development">
                            {dfac.dfacName}
                            <span className="tooltip-message">Page Under Development</span>
                        </span>
                    </>
                )}              
            </h3>
            <img src={mealImageURL} alt={`Meal: ${meal.mealName}`} />
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
            {hasOrdered ? (
                <div className="button-container">
                    <button id="remove-btn" onClick={handleRemoveFromCart}>
                        Remove from cart
                    </button>
                    {!isViewingCart && <Link to="/cart" className="go-to-cart-btn">Go to Cart</Link>}
                </div>
            ) : (
                <button onClick={handleAddToCart}>
                    Add to cart
                </button>
            )}
        </li>
    );
}

export default MealCard;
