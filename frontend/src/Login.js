import React ,{useState} from 'react';
import { Link , useNavigate } from 'react-router-dom';
// import api from './api';
import validation from './LoginValidation';
import axios from 'axios';
import loginbgUrl from "./carpool-vector.jpg";
import './Login.css';

function Login() {
  const [values,setValues]=useState({
    email: '',
    password:''
  })
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  
  const handleInput=(event)=>{

  
    setValues(prev => ({...prev,[event.target.name]:event.target.value}))

  }

  const handleSubmit=async (event)=>{
    console.log(values);
    
    event.preventDefault();
    setErrors(validation(values));
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post('http://localhost:3001/users/login', JSON.stringify(values),
        {
         withCredentials:true,
         headers :{
           'Content-Type': 'application/json'
         }
    
        
        });
        console.log(response.data);

        if (response.data.token) {
          
          localStorage.setItem('token', response.data.token);
          navigate('/home');
        } else {
          setErrors({ general: 'Login failed. Please check your credentials and try again.' });
        }
      } catch (error) {
        setErrors({ general: 'An error occurred. Please try again later.' });
      }
    }
  };
  

  return (
    <div className='flex justify-center items-center h-screen'>
      <div>
    <img src={loginbgUrl} /></div>
    <div className='login-content'>
    <div className='bg-white p-3 rounded w'>
        <form action='' onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder='Enter Email' name='email' 
            onChange={handleInput} className='form-control rounded border border-black-300 focus:border-indigo-500 focus:ring-indigo-500'/>
            {errors.email &&  <span   className='text-danger'>{errors.email}</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder='Enter Password' name='password'
            onChange={handleInput} className='form-control rounded-0 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'/>
            {errors.password &&  <span   className='text-danger'>{errors.password}</span>}

          </div>

          <button type="submit" className='btn btn-success w-100'>Log In</button>
          <p>You agree to our terms and policies</p>
          <Link  to="/Signup"className='btn btn-success border w-full'>Create Account</Link>
         
        </form>
      </div>
      </div>
    </div>
  );
}

export default Login;

