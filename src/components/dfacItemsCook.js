import React, { useState, useEffect } from "react";
import DdashApi from "../api";

function DfacItems({ dfacID, editable }) {
    const [menuItems, setMenuItems] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Fetch menu items from the API based on dfacID
        const fetchMenuItems = async () => {
            try {
                const items = await DdashApi.getMenuItems(dfacID);
                setMenuItems(items);
            } catch (err) {
                console.error("Error fetching menu items: ", err);
            }
        };

        fetchMenuItems();
    }, [dfacID]);

    return (
        <div className="dfac-items">
            <h2><b>Menu Items</b></h2>
            {editable && (
                <>
                    <p>Edit a Menu Item or Customize Items</p>
                    <button onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? "Cancel Editing" : "Edit Items"}
                    </button>
                </>
            )}
            {/* Render menu items in a table */}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        {editable && isEditing && <th>Edit</th>}
                    </tr>
                </thead>
                <tbody>
                    {menuItems.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            {editable && isEditing && (
                                <td>
                                    {/* Add edit functionality here */}
                                    <button>Edit</button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DfacItems;
