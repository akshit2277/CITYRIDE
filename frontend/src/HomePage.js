// src/HomePage.js
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';
import AuthService from './AuthService';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropoffLocation, setDropoffLocation] = useState(null);
  const [pickupAutocomplete, setPickupAutocomplete] = useState(null);
  const [dropoffAutocomplete, setDropoffAutocomplete] = useState(null);

  const handlePickupPlaceChanged = () => {
    if (pickupAutocomplete !== null) {
      const place = pickupAutocomplete.getPlace();
      setPickup(place.formatted_address);
      setPickupLocation(place.geometry.location);
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  const handleDropoffPlaceChanged = () => {
    if (dropoffAutocomplete !== null) {
      const place = dropoffAutocomplete.getPlace();
      setDropoff(place.formatted_address);
      setDropoffLocation(place.geometry.location);
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  const handleLogout = () => {
    AuthService.logout();
    navigate('/');
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY" libraries={['places']}>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleLogout}>Logout</button>
        <Autocomplete
          onLoad={(autocomplete) => setPickupAutocomplete(autocomplete)}
          onPlaceChanged={handlePickupPlaceChanged}
        >
          <input
            type="text"
            placeholder="Enter pickup location"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            style={{ width: '300px', height: '40px', padding: '10px', margin: '10px' }}
          />
        </Autocomplete>
        <Autocomplete
          onLoad={(autocomplete) => setDropoffAutocomplete(autocomplete)}
          onPlaceChanged={handleDropoffPlaceChanged}
        >
          <input
            type="text"
            placeholder="Enter dropoff location"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            style={{ width: '300px', height: '40px', padding: '10px', margin: '10px' }}
          />
        </Autocomplete>
      </div>
      <GoogleMap
        mapContainerStyle={{ height: '400px', width: '100%' }}
        center={{ lat: -3.745, lng: -38.523 }}
        zoom={10}
      >
        {pickupLocation && (
          <Marker position={pickupLocation} label="Pickup Location" />
        )}
        {dropoffLocation && (
          <Marker position={dropoffLocation} label="Dropoff Location" />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default HomePage;
