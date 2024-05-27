import React from 'react'
// import logo from './logo.svg';
// import './App.css';
import Login from './Login';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './Signup';
import HomePage from './HomePage';
import AuthService from './AuthService';



function App() {
  const currentUser = AuthService.getCurrentUser();

  return (
    <BrowserRouter>
       <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path="/home" element={currentUser ? <HomePage /> : <Login />} />


       </Routes>
    </BrowserRouter>
    
    

  );
}

export default App;
