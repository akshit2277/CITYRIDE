import React, {useState} from 'react'
import { Link , useNavigate} from "react-router-dom"
import api from './api';
import validation from './signupValidation'

function Signup() {
  const [values,setValues]=useState({
    name: '',
     email: '',
    password:''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInput=(event)=>{
    setValues(prev => ({...prev,[event.target.name]:[event.target.value]}))
  };

  const handleSubmit=async (event)=>{
    event.preventDefault();
    setErrors(validation(values));
    if (Object.keys(errors).length === 0) {
      try {
        const response = await api.post('/signup', {
          name: values.name,
          email: values.email,
          password: values.password
        });

        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          navigate('/home');
        } else {
          setErrors({ general: 'Signup failed. Please try again.' });
        }
      } catch (error) {
        setErrors({ general: 'An error occurred. Please try again later.' });
      }
    }
  };
  



  return (
    <div className='flex justify-center items-center bg-primary h-screen'>
      <div className='bg-white p-3 rounded w'>
      <h2>signup</h2>
        <form action='' onSubmit={handleSubmit}>
          <div className='mb-3'>

            <label htmlFor="name">Name</label>
            <input type="text" placeholder='Enter Name' name ='name'
            onChange={handleInput} className='form-control rounded border border-black-300 focus:border-indigo-500 focus:ring-indigo-500'/>
            {errors.name &&  <span   className='text-danger'>{errors.name}</span>}
          </div>


          <div className='mb-3'>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder='Enter Email' name='email'
           onChange={handleInput} className='form-control rounded border border-black-300 focus:border-indigo-500 focus:ring-indigo-500'/>
           {errors.email &&  <span   className='text-danger'>{errors.email}</span>}
          </div>


          <div className='mb-3'>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder='Enter Password' name = 'password'
             onChange={handleInput}  className='form-control rounded-0 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'/>
             {errors.password &&  <span   className='text-danger'>{errors.password}</span>}
          </div>

          <button type  ='submit' className='btn btn-success w-20'>Sign up</button>
          <p>You agree to our terms and policies</p>
          <Link  to="/" className='btn btn-success border w-full'>Login</Link>
        </form>
      </div>
    </div>
   
  );
}

export default Signup;
