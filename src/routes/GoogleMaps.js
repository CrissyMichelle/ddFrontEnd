import React, { useState, useEffect } from "react";
import DdashApi from "../api";
import GoogleMap from "../components/GoogleMap";
import './GoogleMaps.css';

const GoogleMaps = () => {
  // State to store data needed for the map, if any
  const [mapData, setMapData] = useState([]);

  useEffect(() => {
    // Fetch data from your API if needed
    const fetchData = async () => {
      try {
        const data = await DdashApi.getDfacs(); // Adjust the API call based on your needs
        setMapData(data); // Set the data to state
      } catch (error) {
        console.error("Error fetching data for the map:", error);
      }
    };

    fetchData(); // Call the fetchData function
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div>
      {/* Pass the necessary data to the GoogleMap component */}
      <GoogleMap mapData={mapData} />
    </div>
  );
};

export default GoogleMaps;
