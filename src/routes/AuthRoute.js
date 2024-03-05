import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import DdashApi, {BASE_URL} from "../api";
import './AuthRoute.css';

function AuthRoute() {
    const navigate = useNavigate();
    const { login } = useAuth();    
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [cookData, setCookData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState(null);
    const [cookErrors, setCookErrors] = useState(null);
    
    const handleCustomerChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleCookChange = (event) => {
        setCookData({
            ...cookData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { token } = await DdashApi.authCustomer(formData);
            if (token) {
                login(token);
                navigate('/meals');
                console.log("Customer data: ", await DdashApi.getCustomerDeets(formData.username));
            } else {
                setErrors(['Login failed']);
            }
        } catch (errs) {
            console.error(errs);
            setErrors(errs);
        }
    };

    const handleCookLogin = async (event) => {
        event.preventDefault();

        try {
            console.log(cookData);
            const { token } = await DdashApi.authCook(cookData);
            if (token) {
                login(token);
                navigate('/orders');
            } else {
                setErrors(['92G Login failed']);
            }
        } catch (errs) {
            console.error(errs);
            setCookErrors(errs);
        }
    }

    return (
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <h3>Customer Login</h3>
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleCustomerChange} />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleCustomerChange} />
                <button type="submit">Login</button>
                <br></br>
                <Link to={`${window.location.origin}/auth/register/customer`}>Create Account</Link>
                {errors && <div className="errors">{errors}</div>}
            </form>
            <form className="form" onSubmit={handleCookLogin}>
                <h3>Culinarians Login</h3>
                <input type="text" name="username" placeholder="Username" value={cookData.username} onChange={handleCookChange} />
                <input type="password" name="password" placeholder="Password" value={cookData.password} onChange={handleCookChange} />
                <button type="submit">Login</button>
                <br></br>
                <Link to={`${window.location.origin}/auth/register/92G`}>Create Culinarian Account</Link>
                {cookErrors && <div className="errors">{cookErrors}</div>}
            </form>
        </div>
    );
}

export default AuthRoute;
