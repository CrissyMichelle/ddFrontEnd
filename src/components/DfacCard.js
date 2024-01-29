import React, { useEffect, useState } from "react";
import DdashApi from "../api";
import { Link, useNavigate } from "react-router-dom";

function DfacCard( { dfac }) {
    const [dfacDetails, setDfacDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchedDfacDetails = async () => {
            try {
                const details = await DdashApi.getDfacDetails(dfac.dfacID);
                setDfacDetails(details);
            } catch (err) {
                console.error("Error fetching dfac data: ", err);
            }
        };

        fetchedDfacDetails();
    }, [dfac.dfacID]);
    
    console.log("Meals object with dfac details: ", dfacDetails);
    const handleMealListNavigation = () => {
        navigate(`/meals/dfac/${dfac.dfacID}`, { state: dfacDetails });
    };

    if (!dfacDetails) {
        return <div>Loading... ...</div>;
    }

    return (
        <div className="dfac-card">
            <img src={dfac.dfacLogo} alt={`${dfac.dfacName} logo`} />
            <button onClick={handleMealListNavigation}>View Available Meals</button>
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
            <p>{dfac.street} {dfac.bldgNum}</p>
            <p>{dfac.city} {dfac.state}{dfac.zip}</p>
            <p>dfac.dfacPhone</p>
        </div>
    );
}

export default DfacCard;
