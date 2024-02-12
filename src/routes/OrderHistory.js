import React, { useState, useEffect} from "react";
import { useAuth } from "../components/AuthContext";
import DdashApi from "../api";
import OrderCard from "../components/OrderCard";

function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchOrderHistory = async () => {
            setIsLoading(true);

            try {
                const userOrders = await DdashApi.getOrderHistory(currentUser);
                
                const ordersWithDfacNames = await Promise.all(userOrders.map(async (order) => {
                    const dfacDeets = await DdashApi.getDfacDetails(order.meal.dfacID);
                    return { ...order, dfacName: dfacDeets.dfacDetails.dfacName};
                }));
                console.log("OrderHistory dfac names: ", ordersWithDfacNames);
                setOrders(ordersWithDfacNames);
            } catch (err) {
                console.error("Error getting order history: ", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrderHistory();
    }, [currentUser]);

    const handleCancelOrder = async (orderID) => {
        try {
            // await DdashApi.cancelOrder(orderID);
            console.log("Order cancelled: ", orderID);
        } catch (err) {
            console.error("Error canceling order: ", err);
        }
    };

    if (isLoading) return <div>Loading... ...</div>;

    return (
        <div>
            <h2>Order History</h2>
            {orders.length > 0 ? (
                orders.map(order => (
                    <OrderCard key={order.orderID} order={order} onCancelOrder={handleCancelOrder} dfacName={order.dfacName} />
                ))
            ) : (
                <p>You haven't placed any orders yet.</p>
            )}
        </div>
    );
};

export default OrderHistory;
