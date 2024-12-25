import React, { useState, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  Autocomplete,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import AuthService from "./AuthService";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import axios from "axios";

const HomePage = () => {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropoffLocation, setDropoffLocation] = useState(null);
  const [pickupAutocomplete, setPickupAutocomplete] = useState(null);
  const [dropoffAutocomplete, setDropoffAutocomplete] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [date, setDate] = useState("");
  const [passengerCount, setPassengerCount] = useState(1);
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showViewRidesDropdown, setShowViewRidesDropdown] = useState(false);
  const mapRef = useRef(null);

  const handlePickupPlaceChanged = () => {
    if (pickupAutocomplete !== null) {
      const place = pickupAutocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const location = place.geometry.location;
        setPickup(place.formatted_address);
        setPickupLocation(location);
        if (mapRef.current) {
          mapRef.current.panTo(location);
        }
      } else {
        console.log("Place geometry not available");
      }
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  const handleDropoffPlaceChanged = () => {
    if (dropoffAutocomplete !== null) {
      const place = dropoffAutocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const location = place.geometry.location;
        setDropoff(place.formatted_address);
        setDropoffLocation(location);
        if (mapRef.current) {
          mapRef.current.panTo(location);
        }
      } else {
        console.log("Place geometry not available");
      }
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  const calculateDistanceAndDuration = () => {
    if (pickupLocation && dropoffLocation) {
      const service = new window.google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [pickupLocation],
          destinations: [dropoffLocation],
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === "OK") {
            const result = response.rows[0].elements[0];
            if (result.status === "OK") {
              setDistance(result.distance.text);
              setDuration(result.duration.text);
              // Save location moved to bookRide function
            } else {
              console.log(
                "Error calculating distance and duration:",
                result.status
              );
            }
          } else {
            console.log("Error with Distance Matrix service:", status);
          }
        }
      );

      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: pickupLocation,
          destination: dropoffLocation,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK") {
            setDirectionsResponse(result);
          } else {
            console.error(`Error fetching directions: ${status}`);
          }
        }
      );
    }
  };

  const saveLocation = async (distance, duration) => {
    // console.log(req.user);
    const userId = AuthService.getCurrentUser().id;
    console.log(userId);
    try {
      axios
        .post(
          "http://localhost:3001/users/save-location",
          {
            pickupAddress: pickup,

            dropoffAddress: dropoff,
            distance,
            duration,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )

        .then((response) => {
          console.log("Location saved successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error saving location:", error);
        });
    } catch (err) {
      console.log("ni ara");
    }
  };

  // const handleLogout = () => {
  //   AuthService.logout();
  //   navigate("/");
  // };
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
    console.log(!showDropdown);
  };

  const toggleViewRidesDropdown = () => {
    setShowViewRidesDropdown((prev) => !prev);
  };

  return (
    <LoadScript
      googleMapsApiKey=""
      libraries={["places"]}
    >
      <div className="home-page">
        {/* Navbar Section */}
        <nav className="navbarSection ">
          <div className="navbar-values">RideShare</div>
          <button
            className="publish-buttn"
            onClick={() => navigate("/Publish")}
          >
            Publish
          </button>
          <div className="view-rides">
            <div
              className="view-rides-button"
              onClick={toggleViewRidesDropdown}
            >
              View Rides
            </div>
            {showViewRidesDropdown && (
              <div className="dropdown-list">
                <button onClick={() => navigate("/view-booked-rides")}>
                  View Booked Rides
                </button>
                <button onClick={() => navigate("/view-published-rides")}>
                  View Published Rides
                </button>
              </div>
            )}
          </div>
          <div className="profile">
            <div className="profile-buttn" onClick={toggleDropdown}>
              <i className="fas fa-user-circle"></i>
            </div>
            {showDropdown && (
              <div className="dropdown-list">
                <button onClick={() => navigate("/login")}>Login</button>
                <button onClick={() => navigate("/signup")}>Signup</button>
              </div>
            )}
          </div>
        </nav>
        {/* <button className="logout-button" onClick={handleLogout}>
          Logout
        </button> */}

        <div className="input">
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
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="date-input"
          />
          <input
            type="number"
            min="1"
            max="10"
            value={passengerCount}
            onChange={(e) => setPassengerCount(e.target.value)}
            placeholder="Passengers"
            className="passenger-input"
          />
          <button
            onClick={calculateDistanceAndDuration}
            className="calculate-button"
          >
            Calculate Distance
          </button>

          {distance && duration && (
            <div className="distance-info">
              <strong>Distance:</strong> {distance} <br />
              <strong>Duration:</strong> {duration}
            </div>
          )}

          <button
            onClick={() =>
              navigate(
                `/availablerides?pickup=${pickup}&dropoff=${dropoff}&date=${date}`
              )
            }
            className="calculate-button"
          >
            Search Rides
          </button>
          {/* <button onClick={bookRide} className="book-ride-button">
          Book Ride
        </button> */}
        </div>

        <GoogleMap
          mapContainerClassName="map-container"
          center={{ lat: -3.745, lng: -38.523 }}
          zoom={10}
          onLoad={(map) => (mapRef.current = map)}
        >
          {pickupLocation && (
            <Marker position={pickupLocation} label="Pickup Location" />
          )}
          {dropoffLocation && (
            <Marker position={dropoffLocation} label="Dropoff Location" />
          )}
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
        {distance && duration && (
          <div className="distance-info">
            Distance: {distance} <br />
            Duration: {duration}
          </div>
        )}
      </div>
    </LoadScript>
  );
};

export default HomePage;
