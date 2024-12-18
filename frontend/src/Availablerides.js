import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
import AuthService from "./AuthService";
import "./AvailableRides.css";

const AvailableRides =() => {
    const [rides, setRides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
  const navigate = useNavigate();


  function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  const query =useQuery();
  const pickup=query.get("pickup")
  const dropoff=query.get("dropoff")
  const date=query.get("date")

 useEffect(()=>{
    const fetchRides = async () => {

        try {
          const response = await axios.post(
            "http://localhost:3001/users/getRides",
            { pickup, dropoff, date },
            { headers: { "Content-Type": "application/json" } }
          );
          setRides(response.data);
          console.log(response.data);
          
    
    
          setLoading(false);
          
        } catch (err) {
          setError(err.response?.data?.message || "Error fetching rides");
          setLoading(false);
        }
    }
    fetchRides();
      },[pickup,dropoff,date]
    
) 

  const bookRide = async (ride) => {
    try {
      // const userId = AuthService.getCurrentUser(); 
      // console.log(userId);
      const rideDetails = {
        rideId: ride._id,
        name:ride.name,
        price:ride.price,
        contactNumber:ride.contactNumber,
        pickup: ride.pickup,
        dropoff: ride.dropoff,
        rideDate: ride.rideDate,
        rideInfo: ride.rideInfo,
        duration: ride.duration,
        availableSeats: ride.availableSeats,
      }
      
      const response = await axios.post(
        `http://localhost:3001/users/rides/book`,
        rideDetails,
        { withCredentials: true,
          headers:{
               'Authorization':`Bearer ${localStorage.getItem('token')}`,
          }
        }
      );
      console.log(response.data);

      alert("Ride booked successfully!");
      navigate("/"); 
    } catch (err) {
      alert("Error booking ride: " + err.response?.data?.message || err.message);
    }
  };

  if (loading) return <div>Loading available rides...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="available-rides">
      <h2>Available Rides</h2>
      {rides.length > 0 ? (
        rides.map((ride) => (
          <div key={ride._id} className="ride-card">
            <h3>Ride Details</h3>
            <p><strong>Pickup:</strong> {ride.pickup}</p>
            <p><strong>Dropoff:</strong> {ride.dropoff}</p>
            <p><strong>Date:</strong> {ride.rideDate}</p>
            <p><strong>Name:</strong> {ride.name}</p>
            <p><strong>Price:</strong> {ride.price}</p>            
            <p><strong>Contact:</strong> {ride.contactNumber}</p>
            <p><strong>rideInfo:</strong> {ride.rideInfo}</p>
            <p><strong>Duration:</strong> {ride.duration}</p>
            <p><strong>Available Seats:</strong> {ride.availableSeats}</p>
            { <button
              className="book-ride-button"
              onClick={() => bookRide(ride)}
            >
              Book Ride
            </button> }
          </div>
        ))
      ) : (
        <div>No rides available for the selected criteria.</div>
      )}
    </div>
  );
};

export default AvailableRides;
