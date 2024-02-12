import React from "react";

function OrderCard({ order }) {
    return (
        <div className="order-card">
            <h3>{order.meal.mealName}</h3>
            <p>{order.meal.type} {order.meal.price}</p>
            <p>{order.meal.description}</p>
            <br />
            <h4>Status</h4>
            <p>Order received at: {new Date(order.orderDateTime).toLocaleDateString()}</p>
            <p>Order Ready for pickup?:{new Date(order.readyTime).toLocaleTimeString()} {`show nothing`}</p>
        </div>
    );
}

export default OrderCard;
