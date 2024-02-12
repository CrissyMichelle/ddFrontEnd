import axios from "axios";

export const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

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

    /** GET all DFACs with optional search parameters */
    static async getDfacs(filters = {}) {
        let res = await this.request('auth/dfacs', filters);
        return res.dfacs;
    }

    /** GET all meals with optional search parameters */
    static async getMeals() {
        let res = await this.request('meals');
        return res.meals;
    }

    /** GET details on a specific dfac, including all meals */
    static async getDfacDetails(dfacID) {
        const res = await this.request(`auth/${dfacID}`);
        return res.dfac;
    }

    /** GET details on a specific customer */
    static async getCustomerDeets(username) {
        const res = await this.request(`customers/${username}`);
        return res.customer;
    }

    /** GET specific customer's orders details */
    static async getOrderHistory(username) {
        try {
            const customerDetails = await this.getCustomerDeets(username);
            return customerDetails.orders
        } catch (err) {
            console.error("Error fetching order history: ", err);
            throw err;
        }
    }

    /** POST new order */
    static async addMealToOrder(customerID, mealID, dfacID) {
        try {
            let res = await this.request(`orders`, {customerID, dfacID, mealID}, 'post');
            console.log("A customer placed an order: ", res);
            return res;
        } catch (err) {
            console.error("Error ordering meal: ", err);
            let message = err.response?.data?.error?.message;
            throw Array.isArray(message) ?  message : [message];
        }
    }
}

export default DdashApi;
