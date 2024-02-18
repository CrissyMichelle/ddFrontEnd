import React, { useState, useEffect } from "react";
import DdashApi from "../api";
import DfacCard from "../components/DfacCard";
import "./DfacsRoute.css";

function DfacsRoute() {
    const [dfacs, setDfacs] = useState(null);
    // search and filter managed in local state
    const [searchTerm, setSearchTerm] = useState("");
    const [addressTerm, setAddressTerm] = useState("");
    const [hoursTerm, setHoursTerm] = useState("");
    const [errors, setErrors] = useState(null);

    function handleSearch(event) {
        event.preventDefault();
        fetchDfacs(); // calls API onSubmit
    }

    const fetchDfacs = async () => {
        try {
            const filters = {
                nameLike: searchTerm || undefined,
                addressLike: addressTerm || undefined,
                hoursLike: hoursTerm || undefined
            };

            const dfacData = await DdashApi.getDfacs(filters);
            setDfacs(dfacData);
        } catch (err) {
            console.error("Error fetching dfacs: ", err);
            setErrors(err);
        }
    };

    useEffect(() => {
        fetchDfacs();
    }, []);
    if (errors) return <p>Error loading DFACs</p>;
    if (!dfacs) return <p>Loading DFACs ... ...</p>;

    return (
        <div className="dfacs-container">
            <h1>Dining Facilities</h1>
            {/* <form className="search-form" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search DFACs by name, address, or hours"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <button type="submit">Search</button>
            </form> */}
            <div className="dfac-card">
                {dfacs.map(dfac => (
                    <DfacCard key={dfac.dfacID} dfac={dfac} />
                ))}
            </div>
        </div>
    );
}

export default DfacsRoute;
