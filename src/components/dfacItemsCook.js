import React, { useState, useEffect } from "react";
import DdashApi from "../api";

function DfacItems({ dfacID, editable }) {


    return (
        <div className="dfac-items">
            <h2><b>Menu Items</b></h2>
            {editable && <p>Edit a Menu Item or Customize Items</p>}
            {/* ... (render other items) */}
        </div>

    )
}
