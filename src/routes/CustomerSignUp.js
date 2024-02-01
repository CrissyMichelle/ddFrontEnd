import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DdashApi from "../api";

function CustomerSignUp({ signup }) {
    // Initialize an object for storing the state of each input field
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        dodid: '',
        mealCard: true,
        isAdmin: false,
    });

    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    // Handle changes to the form as a user inputs data
    const handleChange = (event) => {
        const value = event.target.type === checkbox ? event.target.checked : event.target.value;
        setFormData({
            ...formData,
            [event.target.name]: value
        });
    };

    // Handle the onSubmit event
    const handleSubmit = async (event) => {
        event.preventDefault();

        // some front-end validation
        if (formData.password.length < 8) {
            setErrors(['Password must be at least 8 characters long']);
            return;
        }

        if (formData.dodid.length !== 10) {
            setErrors(['DODID must be 10 numbers'])
        }

        try {
            // write async registerCustomer function in DdashApi.js
            const { token } = await DdashApi.registerCustomer(formData);

            if (token) {
                // function that processes token?
                signup(token);
                navigate('/customer/profile');
            }
        } catch (errs) {
            console.errors(errs);
            const message = errs.response?.data?.error?.message || ['Signup failed'];
            setErrors(Array.isArray(message) ? message : [message]);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username"   placeholder="Username" value={formData.username} onChange={handleChange} />
            <input type="text" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
            <input type="text" name="dodid" placeholder="DODID" value={formData.dodid} onChange={handleChange} />
            <input type="bool" name="mealCard" placeholder="MealCard? (Y/N)" value={formData.mealCard} onChange={handleChange} />
            <input type="bool" name="isAdmin" placeholder="Site Admin?" value={formData.isAdmin} onChange={handleChange} />
            <button type="submit">Sign Up!</button>
            {errors && <div>{errors}</div>}
            {isAdmin && <div>{<AdminAuth />}</div>}
        </form>
    );
}

export default CustomerSignUp;
