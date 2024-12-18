import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import "./Confirmation.css";

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { name,createdBy, pickup, dropoff, price, contactNumber, rideDate, rideInfo } =
    location.state || {};

  const handleConfirm = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/users/postRide",
        {
          name,
          pickup,
          dropoff,
          price,
          contactNumber,
          rideDate,
          rideInfo,
          createdBy,
        },{ withCredentials: true,
          headers:{
               'Authorization':`Bearer ${localStorage.getItem('token')}`,
          }
        }
      );
      console.log("Ride saved successfully:", response.data);
      alert("Ride published successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error saving ride:", error);
      alert("Failed to publish ride.");
    }
  };
  return (
    <div className="confirmation-page">
      <h2>Confirm Your Ride</h2>
      <div className="confirmation-card">
        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Pickup:</strong> {pickup}
        </p>
        <p>
          <strong>Dropoff:</strong> {dropoff}
        </p>
        <p>
          <strong>Date:</strong> {rideDate}
        </p>
        <p>
          <strong>Price:</strong> {price} INR
        </p>
        <p>
          <strong>Contact:</strong> {contactNumber}
        </p>
        <p>
          <strong>Ride Information:</strong> {rideInfo}
        </p>
      </div>
      <button className="confirm-button" onClick={handleConfirm}>
        Confirm
      </button>
    </div>
  );
};

export default Confirmation;
