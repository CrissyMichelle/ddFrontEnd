import React, { useEffect, useState } from 'react';
import './GoogleMap.css';

const InitMap = () => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  const locations = {
    "Warrior Inn": { lat: 21.487215, lng: -158.055369 },
    "Wings of Lightning": { lat: 21.483337, lng: -158.040177 },
    "Bronco Cafe": { lat: 21.489618, lng: -158.051138},
  };

  useEffect(() => {
    // Check if the Google Maps API is already loaded
    if (window.google && window.google.maps) {
      // If loaded, just initialize the map
      loadMap();
    } else {
      // If not loaded, load the Google Maps script
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAD1qM67LtjsTauU9GN2ATfHgNKIPuI8HY&loading=async&callback=initMap`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        // Ensure that the initMap function is defined before calling it
        if (window.initMap) {
          window.initMap();
        } else {
          console.error('initMap function not defined.');
        }
      };

      document.head.appendChild(script);

      // Clean up function
      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, []); // Empty dependency array ensures this effect runs only once

  const loadMap = () => {
    setMap(new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 21.4984, lng: -158.0586 },
      zoom: 13,
    }));
  };

  const showLocation = (locationName, coordinates, zoomLevel) => {
    const location = locations[locationName];
    if (location) {
      if (marker) {
        marker.setMap(null);
      }
      map.setCenter(location);
      map.setZoom(zoomLevel || 15);

      const newMarker = new window.google.maps.Marker({
        position: coordinates || location,
        map: map,
        title: locationName,
      });
      setMarker(newMarker);
    }
  };

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '500px' }}></div>
      <ul className='map-list'>
        {Object.entries(locations).map(([locationName, coordinates]) => (
          <li key={locationName}>
            <button className="map-btn" onClick={() => showLocation(locationName, coordinates, 17)}>
              {locationName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InitMap;


