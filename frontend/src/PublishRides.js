import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css"; 

const PublishedRidesPage = () => {
  const [publishedRides, setPublishedRides] = useState([]);

  useEffect(() => {
    const fetchPublishedRides = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/users/rides/published",
          { withCredentials: true,
            headers:{
                 'Authorization':`Bearer ${localStorage.getItem('token')}`,
            },
           
           }
        ).then(response=>setPublishedRides(response.data))
        .catch(error=>{
            console.error('Error fethching token:',error);
            
        })
      } catch (error) {
        console.error("Error fetching published rides:", error);
      }
    };

    fetchPublishedRides();
  }, []);

  return (
    <div className="rides-container">
      <h1 className="title">Published Rides</h1>
      <div className="rides-grid">
      {publishedRides.map((ride) => (
        <div  className="ride-card" key={ride._id}>
          <p>Pickup: {ride.pickup}</p>
          <p>Dropoff: {ride.dropoff}</p>
          <p>Date: {new Date(ride.rideDate).toLocaleDateString()}</p>
          {/* <p>Passengers: {ride.passengerCount}</p> */}
        </div>
      ))}
    </div>
    </div>
  );
};

export default PublishedRidesPage;
