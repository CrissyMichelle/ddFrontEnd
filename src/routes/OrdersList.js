import React, { useState, useEffect } from "react";
import { useAuth } from "../components/AuthContext";
import DdashApi from "../api";

function OrdersList() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const { token, currentUser } = useAuth();

    
    const culinarian = async () => {
        await DdashApi.get92Gdeets(currentUser);
    }

    const fetchOrders = async () => {
        console.log("Token object inside OrdersList: ", token);
        if (token && culinarian) {
            DdashApi.token = token;
            try {
                let fetchedOrders = await DdashApi.getOrders();
                setOrders(fetchedOrders);
            } catch (err) {
                setError("Failed to get all orders: " + err.toString());
            }
        } else {
            setError("You must be a logged-in culinarian to see all orders.")
        }        
    };

    useEffect(() => {
        fetchOrders();
    }, [token, currentUser]);

    const updateOrderStatus = async (orderID, newStatus) => {
        try {
            await DdashApi.updateOrder(orderID, { status: newStatus });
            await fetchOrders();
        } catch (err) {
            console.error("Failed to update order status", err);
            setError("Failed to update order status: " + err.toString());
        }
    };

    return (
        <div>
            {orders.length > 0 ? orders.map((order) => (
                <div key={order.id}>
                    <p>Order ID: {order.id}</p>
                    <p>Order placed at time: {order.order_timestamp}</p>
                    {order.ready_for_pickup ? (
                        <p>Order ready for pickup at {order.ready_for_pickup}</p>
                    ) : (
                        <button onClick={() => updateOrderStatus(order.id, new Date())}>Mark ready for pickup</button>
                    )}
                    {order.picked_up ? (
                        <p>Order completed at {order.picked_up}</p>
                    ) : (
                        <button onClick={() => updateOrderStatus(order.id, new Date())}>Mark order picked up and complete</button>
                    )}
                    {order.canceled && (
                        <p>Order CANCELED</p>
                    )}
                </div>
                )) : (
                <p>No orders found</p>
            )}
            {error && <div className="error">{error}</div>}
        </div>
    );
}

export default OrdersList;
