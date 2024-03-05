import React, { useState, useEffect } from "react";
import DdashApi from "../api";

function DfacItems({ dfacID }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchDfacItems = async () => {
            try {
                const dfacItems = await DdashApi.getDfacItems(dfacID);
                setItems(dfacItems);
            } catch (err) {
                console.error("Failed to load DFAC items: ", err);
            }
        };

        if (dfacID) {
            fetchDfacItems();
        }
    }, [dfacID]);

    return (
        <div>
            <h2>Today's Dine-In Menu Items</h2>
            {items.length > 0 ? (
                <ul className="dfac-items">
                    {items.map(item => (
                        <li key={item.itemID}>
                            {item.menuItem} - {item.colorCode}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No items found for this DFAC.</p>
            )}
        </div>
    );
}

export default DfacItems;