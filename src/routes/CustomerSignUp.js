import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DdashApi from "../api";
import { useAuth } from "../components/AuthContext";
import RoleAuth from "../components/RoleAuth";
import './AuthRoute.css';

function CustomerSignUp() {
    const { signup } = useAuth();

    // Initialize an object for storing the state of each input field
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        dodid: '',
        mealCard: true,
        isAdmin: false,
        role: "customer"
    });
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminVerified, setAdminVerified] = useState(false);

    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    // Handle changes to the form as a user inputs data
    const handleChange = (event) => {
        const { name, type, value, checked } = event.target;
        if (name === 'isAdmin') {
            setIsAdmin(checked);
        } else {
            setFormData({
                ...formData,
                [name]: type === 'checkbox' ? checked : value 
            });
        }
        console.log("Form data: ", formData);
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

        if (isAdmin && !adminVerified) {
            setErrors(['Error with admin verification']);
            return;
        }

        try {
            const { token } = await DdashApi.registerCustomer(formData);

            if (token) {
                console.log("Signup function: ", signup);
                // AuthContext function that processes token
                signup(token);
                navigate('/meals');
            }
        } catch (errs) {
            console.error(errs);
            const message = errs.response?.data?.error?.message || ['Signup failed'];
            setErrors(Array.isArray(message) ? message : [message]);
        }
        console.log("Form data: ", formData);
    };

    // useMemo hook memoizes the RoleAuth component
    const roleAuthComponent = useMemo(() => {
        console.log("Is admin? ", isAdmin);
        console.log("Verified admin? ", adminVerified);

        return isAdmin && !adminVerified ? <RoleAuth role={"admin"} onVerified={setAdminVerified} /> : null        
    }, [isAdmin, adminVerified]); // only re-renders UI when isAdmin and adminVerified change

    return (
        <form className="form" onSubmit={handleSubmit}>
            <input type="text" name="username"   placeholder="Username" value={formData.username} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
            <input type="text" name="dodid" placeholder="DODID" value={formData.dodid} onChange={handleChange} />
            <label>
                Meal Card? (check for Yes)
                <input type="checkbox" name="mealCard" checked={formData.mealCard} onChange={handleChange} />
                <span className="checkmark"></span>
            </label>
            <label>
                Site Admin?
                <input type="checkbox" name="isAdmin" checked={isAdmin} onChange={handleChange} />
                <span className="checkmark"></span>
            </label>
            {/* passing down setAdminVerified as a function that can update the state inside parent component CustomerSignUp
            triggers an update to the state based on an action within the child receiving the function as props 
            then call useMemo hook function prevents unnecessary re-renders and preserves the parent's form state */}
            {roleAuthComponent}
            <button type="submit">Sign Up!</button>
            {errors && <div>{errors}</div>}
        </form>
    );
}

export default CustomerSignUp;
