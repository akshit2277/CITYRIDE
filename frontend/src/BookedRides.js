import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css"; 

const BookedRidesPage = () => {
  const [bookedRides, setBookedRides] = useState([]);

  useEffect(() => {
    const fetchBookedRides = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/users/rides/booked",
          { withCredentials: true,
            headers:{
                'Authorization':`Bearer ${localStorage.getItem('token')}`,
            },
           }
        ).then(response=>setBookedRides(response.data))
        .catch(error=>{
            console.error('Error fethching token:',error);
            
        })
      } catch (error) {
        console.error("Error fetching booked rides:", error);
      }
    };

    fetchBookedRides();
  }, []);

  return (
    <div className="rides-container">
      <h1 className="title">Booked Rides </h1>
      <div className="rides-grid">

      {bookedRides.map((ride) => (
        <div  className="ride-card" key={ride._id}>
          <p>Pickup: {ride.pickup}</p>
          <p>Dropoff: {ride.dropoff}</p>
          <p>Date: {new Date(ride.rideDate).toLocaleDateString()}</p>
          {/* <p>Passengers: {ride._id}</p> */}

        </div>
      ))}
    </div>
    </div>

  );
};

export default BookedRidesPage;
