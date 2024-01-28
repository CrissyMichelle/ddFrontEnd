import React from "react";
import DdashApi from "../api";
import { Link } from "react-router-dom";

function DfacCard( { dfac }) {
    let meals = async () => {
        try {
            await DdashApi.getMeals();
        } catch (err) {
            console.error("Error fetching meals data: ", err);
        }
    };
    const filterMealsByDfac = meals.filter(meal => {
        meal.dfacID === dfac.dfacID
    });

    return (
        <div className="dfac-card">
            <img src={dfac.dfacLogo} alt={`${dfac.dfacName} logo`} />
            <Link to={`/auth/${dfac.dfacID}`}>
                <h2>{dfac.dfacName}</h2>
            </Link>
            <Link to={filterMealsByDfac}>
                <h3>Available Meals</h3>
            </Link>
            <h2><b>Hours</b></h2>
            <h3>Monday - Friday</h3>
            <p>Breakfast</p>
            <p>{dfac.bfHours}</p>
            <p>Lunch</p>
            <p>{dfac.luHours}</p>
            <p>Dinner</p>
            <p>{dfac.dnHours}</p>
            <p><i>Ordering Windows</i></p>
            <p>{dfac.orderBf}</p>
            <p>{dfac.orderLu}</p>
            <p>{dfac.orderDn}</p>
            <h3>Saturday and Sunday</h3>
            <p>Brunch</p>
            <p>{dfac.bchHours}</p>
            <p>Supper</p>
            <p>{dfac.supHours}</p>
            <p><i>Ordering Windows</i></p>
            <p>{dfac.orderBch}</p>
            <p>{dfac.orderSup}</p>
            <div>
                `${dfac.dfacName} address and phone number`
            </div>
            <p>{dfac.flashMsg1}</p>
            <p>{dfac.street} {dfac.bldgnum}</p>
            <p>{dfac.city} {dfac.state}{dfac.zip}</p>
            <p>dfac.dfacPhone</p>
        </div>
    );
}

export default DfacCard;
