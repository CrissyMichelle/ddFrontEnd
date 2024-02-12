import React from "react";

function OrderCard({ order, onCancelOrder, dfacName }) {
    const formatDate = (dateString) => {
        if (!dateString) return 'Pending';
        const date = new Date(dateString);

        return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
    }

    // conditional rendering of order readiness
    const orderComplete = order.order.readyTime
        ? `Order picked up at: ${formatDate(order.order.pickedUpTime)}`
        : 'Ready and waiting for you to pickup!';


    function clickCancel(event) {
        onCancelOrder(order.order.orderID);
    }

    const renderCancelSection = () => {
        return order.order.reaadyTime
            ? <p>Ready for pickup: {formatDate(order.order.readyTime)}</p>
            : (
                <p>
                    Not ready for pickup just yet. {' '}
                    <button onClick={clickCancel}>Cancel Order</button>
                </p>
            );
    }

    return (
        <div className="order-card">
            <h3>{order.meal.mealName} placed at {new Date(order.order.orderDateTime).toLocaleDateString()}</h3>
            <p>You ordered a {order.meal.type} meal from <b>{dfacName}</b> for ${order.meal.price}</p>
            <p>{order.meal.description}</p>
            <h4>Status</h4>
            <p>Order received: {formatDate(order.order.orderDateTime)}</p>
            {renderCancelSection()}
            {order.order.readyTime && (
                <p>Order completion: {orderComplete}</p>
            )}
        </div>
    );
}

export default OrderCard;
