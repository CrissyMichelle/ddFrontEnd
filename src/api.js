import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API class
 * consolidates methods that send/receive data from dfacDash API
 */
class DdashApi {
    // token for interaction with API endpoints
    static token;

    // convenience method of communicating with backend
    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call: ", endpoint, data, method);

        // headers approach to passing along the token with HTTP request
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${DdashApi.token}` };
        const params = (method === "get") ? data : {};

        // asynchronous call to the endpoint
        try {
            return(await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error: ", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API routes

    /** POST new customer data - registers a new user */
    static async registerCustomer(formData) {
        try {
            let res = await this.request('auth/register/customer', formData, 'post');
            return { token: res.token, username: formData.username };
        } catch (err) {
            console.error("Registration error ", err);
            throw err;
        }
    }

    /** POST new 92G data - registers a new culinary professional */
    static async registerCook(formData) {
        try {
            let res = await this.request('auth/register/92G', formData, 'post');
            return { token: res.token, username: formData.username };
        } catch (err) {
            console.error("Registration error ", err);
            throw err;
        }
    }

    /** POST returning customer data - handle authentication at login */
    static async authCustomer(formData) {
        let res = await this.request('auth/customer/login', formData, 'post');
        return { token: res.token, username: formData.username };
    }

    /** POST returning 92G data - handle authentication at login */
    static async authCook(formData) {
        let res = await this.request('auth/92G/login', formData, 'post');
        return { token: res.token, username: formData.username };
    }
}

export default DdashApi;
