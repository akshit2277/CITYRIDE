
import React, { useState } from "react";
import {
  LoadScript,
  Autocomplete,
} from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import "./PublishPage.css";

const PublishPage = () => {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupAutocomplete, setPickupAutocomplete] = useState(null);
  const [dropoffAutocomplete, setDropoffAutocomplete] = useState(null);
  const [price, setPrice] = useState("");
  const[name,setName]=useState("");
  const [rideInfo, setRideInfo] = useState("");
  const [rideDate, setRideDate] = useState("");
  const [contactNumber, setContactNumber] = useState("");


  const handlePickupPlaceChanged = () => {
    if (pickupAutocomplete !== null) {
      const place = pickupAutocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        setPickup(place.formatted_address);
      } else {
        console.log("Pickup place geometry not available");
      }
    } else {
      console.log("Pickup autocomplete not loaded yet!");
    }
  };

  const handleDropoffPlaceChanged = () => {
    if (dropoffAutocomplete !== null) {
      const place = dropoffAutocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        setDropoff(place.formatted_address);
      } else {
        console.log("Dropoff place geometry not available");
      }
    } else {
      console.log("Dropoff autocomplete not loaded yet!");
    }
  };

  const handlePublish = () => {
    if (!name||!pickup || !dropoff || !price || !rideDate || !rideInfo) {
      alert("Please fill in all fields");
      return;
    }

    // Navigate to Confirmation page with state
    navigate("/Confirmation", {
      state: {
        name,
        pickup,
        dropoff,
        price,
        contactNumber,
        rideDate,
        rideInfo,
      },
    });
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCPp8B2BvzMgsUsdCJ8ck0UUBa3DIe8oR8"
      libraries={["places"]}
    >
      <div className="publish-page">
        {/* Navbar */}
        <div className="navbar">
          <div className="navbar-brand">RideShare</div>
          <button className="home-button" onClick={() => navigate("/")}>
            Home
          </button>
        </div>
        

        {/* Publish Ride Form */}
        <div className="publish-content">
          <div className="publish-details">
            <h2>Publish Your Ride</h2>
            <div className="input-container">
              <label>Name:</label>
              <input
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label>Pickup Location:</label>
              <Autocomplete
                onLoad={(autocomplete) => setPickupAutocomplete(autocomplete)}
                onPlaceChanged={handlePickupPlaceChanged}
              >
                <input
                  type="text"
                  placeholder="Enter pickup location"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                />
              </Autocomplete>
            </div>
            <div className="input-container">
              <label>Dropoff Location:</label>
              <Autocomplete
                onLoad={(autocomplete) => setDropoffAutocomplete(autocomplete)}
                onPlaceChanged={handleDropoffPlaceChanged}
              >
                <input
                  type="text"
                  placeholder="Enter dropoff location"
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                />
              </Autocomplete>
            </div>
            <div className="input-container">
              <label>Date of Ride:</label>
              <input
                type="date"
                value={rideDate}
                onChange={(e) => setRideDate(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label>Price:</label>
              <input
                type="number"
                placeholder="Enter price (INR)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label>Contact Number:</label>
              <input
                type="tel"
                placeholder="Enter contact number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label>Information for Ride:</label>
              <textarea
                placeholder="Add details about the ride (e.g., pickup time, preferences)"
                value={rideInfo}
                onChange={(e) => setRideInfo(e.target.value)}
              />
            </div>
            <button className="publish-button" onClick={handlePublish}>
              Publish
            </button>
          </div>
         
        </div>
      </div>
    </LoadScript>
  );
};

export default PublishPage;

