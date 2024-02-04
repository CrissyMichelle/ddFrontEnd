import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DdashApi from "../api";
import RoleAuth from "../components/RoleAuth";
import './AuthRoute.css';

function CookSignUp({ signup }) {
    // Initialize an object for storing the state of each input field
    const [formData, setFormData] = useState({
        dfacID: '',
        username: '',
        password: '',
        rank: '',
        firstName: '',
        lastName: '',
        dodid: '',
        email: '',
        isAdmin: false,
        isManager: false,
        role: '92G'
    });
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminVerified, setAdminVerified] = useState(false);
    const [isManager, setIsManager] = useState(false);
    const [managerVerified, setManagerVerified] = useState(false);

    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    // Handle changes to the form as a user inputs data
    const handleChange = (event) => {
        const { name, type, value, checked } = event.target;
        if (name === 'isAdmin') {
            setIsAdmin(checked);
        } else if (name === 'isManager') {
            setIsManager(checked)
        } else {
            setFormData({
                ...formData,
                [name]: type === 'checkbox' ? checked : value 
            });
        }
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
        if (isManager && !managerVerified) {
            setErrors(['Error with manager verification']);
            return;
        }

        try {
            // write async registerCustomer function in DdashApi.js
            const { token } = await DdashApi.registerCook(formData);

            if (token) {
                // function that processes token?
                signup(token);
                navigate('/auth/dfacs');
            }
        } catch (errs) {
            console.error(errs);
            const message = errs.response?.data?.error?.message || ['Signup failed'];
            setErrors(Array.isArray(message) ? message : [message]);
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <input type="text" name="dfacID"   placeholder="DFAC ID number" value={formData.dfacID} onChange={handleChange} />
            <input type="text" name="username"   placeholder="Username" value={formData.username} onChange={handleChange} />
            <input type="text" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            <input type="text" name="rank" placeholder="Rank" value={formData.rank} onChange={handleChange} />
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
            <input type="text" name="dodid" placeholder="DODID" value={formData.dodid} onChange={handleChange} />
            <input type="text" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            
            <label>
                DFAC Manager? (check for Yes)
                <input type="checkbox" name="isManager" checked={isManager} onChange={handleChange} />
                <span className="checkmark"></span>
            </label>
            <label>
                Site Admin?
                <input type="checkbox" name="isAdmin" checked={isAdmin} onChange={handleChange} />
                <span className="checkmark"></span>
            </label>
            {/* passing down set___Verified as a function that can update the state inside parent component CustomerSignUp
            triggers an update to the state based on an action within the child receiving the function as props */}
            {isManager && !managerVerified && <RoleAuth role={"manager"} onVerified={setManagerVerified} />}
            {isAdmin && !adminVerified && <RoleAuth role={"admin"} onVerified={setAdminVerified} />}

            <button type="submit">Create Account</button>
            {errors && <div>{errors}</div>}
        </form>
    );
}

export default CookSignUp;
