import React, { useState, useEffect} from "react";
import { AuthContext, useAuth } from "../components/AuthContext";
import DdashApi from "../api";

function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const userOrders = await DdashApi.getOrderHistory(currentUser);
                setOrders(userOrders);
            } catch (err) {
                console.error("Error getting order history: ", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrderHistory();
    }, [currentUser]);

    if (isLoading) return <div>Loading... ...</div>;

    return (
        <div>
            <h2>Order History</h2>
            {orders.length > 0 ? (
                orders.map(order => (
                    <div key={order.orderID}>
                        OrderCard component goes here?
                    </div>
                ))
            ) : (
                <p>You haven't placed any orders yet.</p>
            )}
        </div>
    );
};

export default OrderHistory;
