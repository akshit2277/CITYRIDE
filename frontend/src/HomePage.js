// // src/HomePage.js
// import React, { useState } from 'react';
// import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';
// import AuthService from './AuthService';
// import { useNavigate } from 'react-router-dom';
// import './HomePage.css';

// const HomePage = () => {
//   const navigate = useNavigate();
//   const [pickup, setPickup] = useState('');
//   const [dropoff, setDropoff] = useState('');
//   const [pickupLocation, setPickupLocation] = useState(null);
//   const [dropoffLocation, setDropoffLocation] = useState(null);
//   const [pickupAutocomplete, setPickupAutocomplete] = useState(null);
//   const [dropoffAutocomplete, setDropoffAutocomplete] = useState(null);

//   const handlePickupPlaceChanged = () => {
//     if (pickupAutocomplete !== null) {
//       const place = pickupAutocomplete.getPlace();
//       if (place.geometry && place.geometry.location) {
//         setPickup(place.formatted_address);
//         setPickupLocation(place.geometry.location);
//       } else {
//         console.log('Place geometry not available');
//       }
//     } else {
//       console.log('Autocomplete is not loaded yet!');
//     }
//   };

//   const handleDropoffPlaceChanged = () => {
//     if (dropoffAutocomplete !== null) {
//       const place = dropoffAutocomplete.getPlace();
//       if (place.geometry && place.geometry.location) {
//         setDropoff(place.formatted_address);
//         setDropoffLocation(place.geometry.location);
//       } else {
//         console.log('Place geometry not available');
//       }
//     } else {
//       console.log('Autocomplete is not loaded yet!');
//     }
//   };

//   const handleLogout = () => {
//     AuthService.logout();
//     navigate('/');
//   };

//   return (
//     <LoadScript googleMapsApiKey="AIzaSyAWQMXbbN4COEZJ7Gt-wzlXzOcgHIy2ExI" libraries={['places']}>
//       <div style={{ marginBottom: '20px' }}>
//         <button onClick={handleLogout}>Logout</button>
//         <Autocomplete
//           onLoad={(autocomplete) => setPickupAutocomplete(autocomplete)}
//           onPlaceChanged={handlePickupPlaceChanged}
//         >
//           <input
//             type="text"
//             placeholder="Enter pickup location"
//             value={pickup}
//             onChange={(e) => setPickup(e.target.value)}
//             style={{ width: '300px', height: '40px', padding: '10px', margin: '10px' }}
//           />
//         </Autocomplete>
//         <Autocomplete
//           onLoad={(autocomplete) => setDropoffAutocomplete(autocomplete)}
//           onPlaceChanged={handleDropoffPlaceChanged}
//         >
//           <input
//             type="text"
//             placeholder="Enter dropoff location"
//             value={dropoff}
//             onChange={(e) => setDropoff(e.target.value)}
//             style={{ width: '300px', height: '40px', padding: '10px', margin: '10px' }}
//           />
//         </Autocomplete>
//       </div>
//       <GoogleMap
//         mapContainerStyle={{ height: '400px', width: '100%' }}
//         center={{ lat: -3.745, lng: -38.523 }}
//         zoom={10}
//       >
//         {pickupLocation && (
//           <Marker position={pickupLocation} label="Pickup Location" />
//         )}
//         {dropoffLocation && (
//           <Marker position={dropoffLocation} label="Dropoff Location" />
//         )}
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default HomePage;
// import React, { useState } from 'react';
// import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';
// import AuthService from './AuthService';
// import { useNavigate } from 'react-router-dom';
// import './HomePage.css';

// const HomePage = () => {
//   const navigate = useNavigate();
//   const [pickup, setPickup] = useState('');
//   const [dropoff, setDropoff] = useState('');
//   const [pickupLocation, setPickupLocation] = useState(null);
//   const [dropoffLocation, setDropoffLocation] = useState(null);
//   const [pickupAutocomplete, setPickupAutocomplete] = useState(null);
//   const [dropoffAutocomplete, setDropoffAutocomplete] = useState(null);

//   const handlePickupPlaceChanged = () => {
//     if (pickupAutocomplete !== null) {
//       const place = pickupAutocomplete.getPlace();
//       if (place.geometry && place.geometry.location) {
//         setPickup(place.formatted_address);
//         setPickupLocation(place.geometry.location);
//       } else {
//         console.log('Place geometry not available');
//       }
//     } else {
//       console.log('Autocomplete is not loaded yet!');
//     }
//   };

//   const handleDropoffPlaceChanged = () => {
//     if (dropoffAutocomplete !== null) {
//       const place = dropoffAutocomplete.getPlace();
//       if (place.geometry && place.geometry.location) {
//         setDropoff(place.formatted_address);
//         setDropoffLocation(place.geometry.location);
//       } else {
//         console.log('Place geometry not available');
//       }
//     } else {
//       console.log('Autocomplete is not loaded yet!');
//     }
//   };

//   const handleLogout = () => {
//     AuthService.logout();
//     navigate('/');
//   };

//   return (
//     <LoadScript googleMapsApiKey="AIzaSyAWQMXbbN4COEZJ7Gt-wzlXzOcgHIy2ExI" libraries={['places']}>
//       <div className="home-page">
//         <button className="logout-button" onClick={handleLogout}>Logout</button>
//         <div className="input-container">
//           <Autocomplete
//             onLoad={(autocomplete) => setPickupAutocomplete(autocomplete)}
//             onPlaceChanged={handlePickupPlaceChanged}
//           >
//             <input
//               type="text"
//               placeholder="Enter pickup location"
//               value={pickup}
//               onChange={(e) => setPickup(e.target.value)}
//             />
//           </Autocomplete>
//           <Autocomplete
//             onLoad={(autocomplete) => setDropoffAutocomplete(autocomplete)}
//             onPlaceChanged={handleDropoffPlaceChanged}
//           >
//             <input
//               type="text"
//               placeholder="Enter dropoff location"
//               value={dropoff}
//               onChange={(e) => setDropoff(e.target.value)}
//             />
//           </Autocomplete>
//         </div>
//         <GoogleMap
//           mapContainerClassName="map-container"
//           center={{ lat: -3.745, lng: -38.523 }}
//           zoom={10}
//         >
//           {pickupLocation && (
//             <Marker position={pickupLocation} label="Pickup Location" />
//           )}
//           {dropoffLocation && (
//             <Marker position={dropoffLocation} label="Dropoff Location" />
//           )}
//         </GoogleMap>
//       </div>
//     </LoadScript>
//   );
// };

// export default HomePage;
import React, { useState, useRef } from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';
import AuthService from './AuthService';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropoffLocation, setDropoffLocation] = useState(null);
  const [pickupAutocomplete, setPickupAutocomplete] = useState(null);
  const [dropoffAutocomplete, setDropoffAutocomplete] = useState(null);
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
        console.log('Place geometry not available');
      }
    } else {
      console.log('Autocomplete is not loaded yet!');
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
        console.log('Place geometry not available');
      }
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  const handleLogout = () => {
    AuthService.logout();
    navigate('/');
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyAWQMXbbN4COEZJ7Gt-wzlXzOcgHIy2ExI" libraries={['places']}>
      <div className="home-page">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
        <div className="input-container">
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
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default HomePage;

