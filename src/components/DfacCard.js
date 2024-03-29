import React, { useEffect, useState } from "react";
import DdashApi from "../api";
import { Link, useNavigate } from "react-router-dom";
import "./DfacCard.css";
import logo2IBCT from "../images/dfac_logos/2ibct.jpg";
import logo25AVN from "../images/dfac_logos/25avn.jpg";
import logo3IBCT from "../images/BroncoCafe.jpg";
import DfacItems from "./DfacItems";

function DfacCard({ dfac }) {
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
            <h2><b>{dfac.dfacName}</b></h2>
            {dfac.dfacID === 1 ? (
                <img src={logo2IBCT} alt="2IBCT Logo" />
            ) : dfac.dfacID === 2 ? (
                <img src={logo25AVN} alt="25CAB Logo" />
            ) : (
                <img src={logo3IBCT} alt="3IBCT Logo"/>
            )}
            <br/>
            <button onClick={handleMealListNavigation}>View Available Meals</button>
            <h2>
                {dfac.flashMsg1}
            </h2>
            <DfacItems dfacID={dfac.dfacID} />
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
            <p><b><u>Address and Phone</u></b></p>
            <p>{dfac.street} {dfac.bldgNum}</p>
            <p>{dfac.city} {dfac.state}{dfac.zip}</p>
            <p>{dfac.dfacPhone}</p>
        </div>
    );
}

export default DfacCard;
