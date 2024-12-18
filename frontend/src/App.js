import React from 'react'
// import logo from './logo.svg';
// import './App.css';
import Login from './Login';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './Signup';
import HomePage from './HomePage';
import AuthService from './AuthService';
import Publish from './Publish';
import Confirmation from './Confirmation';
import Availablerides from './Availablerides';
import PublishRides from './PublishRides'
import BookedRides from './BookedRides';




function App() {
  const currentUser = AuthService.getCurrentUser();

  return (
    <BrowserRouter>
       <Routes>
        <Route path='/' element={<HomePage />}></Route>
       <Route path='/Login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path="/home" element={ currentUser ?<HomePage /> :<Login/>} ></Route>
        <Route path="/availablerides" element={<Availablerides />}></Route>
        <Route path='/Publish' element={<Publish />}></Route>
        <Route path='/Confirmation' element={<Confirmation />}></Route>
        <Route path='/view-published-rides' element={<PublishRides />}></Route>
        <Route path='/view-booked-rides' element={<BookedRides />}></Route>



       </Routes>
    </BrowserRouter>
    
    

  );
}

export default App;
