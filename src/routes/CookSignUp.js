import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DdashApi from "../api";
import RoleAuth from "../components/RoleAuth";
import './AuthRoute.css';
import { useAuth } from "../components/AuthContext";

function CookSignUp() {
    const { signup } = useAuth();

    const [isAdmin, setIsAdmin] = useState(false);
    const [adminVerified, setAdminVerified] = useState(false);
    const [isManager, setIsManager] = useState(false);
    const [managerVerified, setManagerVerified] = useState(false);

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
        updateMenu: isManager && managerVerified,
        updateHours: isManager && managerVerified,
        updateMeals: isManager && managerVerified,
        updateOrders: isManager && managerVerified,
        role: '92G'
    });

    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    // Handle changes to the form as a user inputs data
    const handleChange = (event) => {
        const { name, type, value, checked } = event.target;
        if (name === 'isAdmin') {
            setIsAdmin(checked);
        } else if (name === 'isManager') {
            setIsManager(checked)
        } else if (name === 'isManager') {
            setIsManager(checked)
        } else if (name === 'dfacId') {
            const dfacIDVal = parseInt(value, 10);

            if (!isNaN(dfacIDVal) && dfacIDVal >= 1 && dfacIDVal <= 10) {
                setFormData({
                    ...formData,
                    [name]: type === 'checkbox' ? checked : dfacIDVal 
                });
            } else {
                setErrors(['DFAC ID number must be a valid integer between 1 and 10']);
            }
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

    // useMemo hook memoizes the RoleAuth component
    const roleAuthComponent = useMemo(() => {
        console.log("Is admin? ", isAdmin);
        console.log("Verified admin? ", adminVerified);

        return isAdmin && !adminVerified ? <RoleAuth role={"admin"} onVerified={setAdminVerified} /> : null        
    }, [isAdmin, adminVerified]); // only re-renders UI when isAdmin and adminVerified change

    const managerAuthComponent = useMemo(() => {
        console.log("Is manager? ", isManager);
        console.log("Verified manager? ", managerVerified);

        return isManager && !managerVerified ? <RoleAuth role={"manager"} onVerified={setManagerVerified} /> : null        
    }, [isManager, managerVerified]);

    return (
        <form className="form" onSubmit={handleSubmit}>
            <input type="text" name="dfacID"   placeholder="DFAC ID number" value={formData.dfacID} onChange={handleChange} />
            <input type="text" name="username"   placeholder="Username" value={formData.username} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
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
            {managerAuthComponent}
            {roleAuthComponent}
            <button type="submit">Create Account</button>
            {errors && <div>{errors}</div>}
        </form>
    );
}

export default CookSignUp;
