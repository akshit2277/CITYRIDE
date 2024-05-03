import React ,{useState} from 'react';
import { Link } from 'react-router-dom';
import validation from './LoginValidation';

function Login() {
  const [values,setValues]=useState({
    email: '',
    password:''
  })
  const [errors, setErrors] = useState({});
  const handleInput=(event)=>{
    setValues(prev => ({...prev,[event.target.name]:[event.target.value]}))

  }

  const handleSubmit=(event)=>{
    event.preventDefault();
    setErrors(validation(values));
  }
  return (
    <div className='flex justify-center items-center bg-primary h-screen'>
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

          <button type="submit" className='btn btn-success w-20'>Log In</button>
          <p>You agree to our terms and policies</p>
          <Link  to="/Signup"className='btn btn-success border w-full'>Create Account</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
