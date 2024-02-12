import React, { useEffect, useState } from "react";
import { AuthContext, useAuth } from "./AuthContext";
import DdashApi from "../api";
import { Link, useNavigate } from "react-router-dom";
import "./DfacCard.css";

function CustomerProfile({ customer }) {
    const { currentUser } = useAuth();
    const [customerDetails, setCustomerDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchedCustomerDetails = async () => {
            try {
                const details = await DdashApi.getCustomerDeets(currentUser);
                setCustomerDetails(details);
            } catch (err) {
                console.error("Error fetching customer data: ", err);
            }
        };

        fetchedCustomerDetails();
    }, [currentUser]);
    
    console.log("Orders array within customer details: ", customerDetails);
    const handleOrdersListNavigation = () => {
        navigate(`/orders/customer/${customer.customerID}`, { state: customerDetails });
    };

    if (!customerDetails) {
        return <div>Loading... ...</div>;
    }

    return (
        <div className="dfac-card">
            <h2><b>Welcome, {customer.username}</b></h2>
            <img src={`${customer.profilePicURL}`} alt="Profile Picture" />
            <button onClick={handleOrdersListNavigation}>View Order History</button>
            <h3>Customer Information</h3>
            <p>Name</p>
            <p>{customer.firstName} {customer.lastName}</p>
            <p>DODID</p>
            <p>{customer.dodid}</p>
            <p>Phone number</p>
            <p>{customer.phNumber}</p>
            <p><i>Meal Card Holder?</i></p>
            <p>{customer.mealCard}</p>
            <p>email</p>
            <p>{customer.email}</p>
            <h3>Karma Score</h3>
            <p>{customer.karmaScore}</p>
        </div>
    );
}

export default CustomerProfile;
