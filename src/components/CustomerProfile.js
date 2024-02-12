import React, { useEffect, useState } from "react";
import { AuthContext, useAuth } from "./AuthContext";
import DdashApi from "../api";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./DfacCard.css";

function CustomerProfile() {
    const location = useLocation();
    const { currentUser } = useAuth();
    const [customerDetails, setCustomerDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchedCustomerDetails = async () => {
            try {
                // Check for customer data in the location state
                const customerFromState = location.state?.customer;

                let details;
                if (customerFromState) {
                    details = customerFromState;
                } else if (currentUser) {
                    details = await DdashApi.getCustomerDeets(currentUser);
                } else {
                    console.error("No customer data available");
                    navigate('/');
                    return;
                }

                setCustomerDetails(details);
            } catch (err) {
                console.error("Error fetching customer data: ", err);
            }
        };

        fetchedCustomerDetails();
    }, [currentUser, location.state]);
    
    console.log("Orders array within customer details: ", customerDetails);
    const handleOrdersListNavigation = () => {
        navigate(`/orders/customer/${customerDetails.customerID}`);
    };

    if (!customerDetails) {
        return <div>Loading... ...</div>;
    }

    return (
        <div className="dfac-card">
            <h2><b>Welcome, {customerDetails.username}</b></h2>
            <img src={`${customerDetails.profilePicURL}`} alt="Profile Picture" />
            <button onClick={handleOrdersListNavigation}>View Order History</button>
            <h3>Customer Information</h3>
            <p>Name</p>
            <p>{customerDetails.firstName} {customerDetails.lastName}</p>
            <p>DODID</p>
            <p>{customerDetails.dodid}</p>
            <p>Phone number</p>
            <p>{customerDetails.phNumber}</p>
            <p><i>Meal Card Holder?</i></p>
            <p>{customerDetails.mealCard}</p>
            <p>email</p>
            <p>{customerDetails.email}</p>
            <h3>Karma Score</h3>
            <p>{customerDetails.karmaScore}</p>
        </div>
    );
}

export default CustomerProfile;
