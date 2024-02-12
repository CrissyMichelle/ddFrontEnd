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
        console.log("getCustomerDeets output: ", res.customer);
        return res.customer;
    }

    /** GET specific customer's order details, including meal data */
    static async getOrderHistory(username) {
        try {
            const customerDetails = await this.getCustomerDeets(username);
            console.log("Orders array from getOrderHistory: ", customerDetails.orders);

            const orderIDs = customerDetails.orders.map(order => order.orderID);
            console.log("Extracted orderIDs from getOrderHistory: ", orderIDs);

            // fetch meal and order data using another DdashApi method
            const ordersWithDeets = await Promise.all(
                orderIDs.map(orderID => this.getOrderDetails(orderID))
            );

            console.log("Orders with Deets: ", ordersWithDeets);
            return ordersWithDeets;
        } catch (err) {
            console.error("Error fetching order history: ", err);
            throw err;
        }
    }

    /** GET details for a specific order, including meal data */
    static async getOrderDetails(orderID) {
        try {
            let res = await this.request(`orders/${orderID}`);
            console.log("getOrderDetails output: ", res.order);
            return res.order;
        } catch (err) {
            console.error(`Error getting data for orderID ${orderID}: `, err);
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

    /** PATCH update an order with variable amount of data */
    static async updateOrder(orderID, updateData) {
        try {
            const res = await this.request(`orders/${orderID}`, updateData, 'patch');
            console.log("updateOrder output: ", res.order);
            return res.order;
        } catch (err) {
            console.error(`Error patchin order ${orderID}: `, err);
            throw err;
        }
    }
}

export default DdashApi;
