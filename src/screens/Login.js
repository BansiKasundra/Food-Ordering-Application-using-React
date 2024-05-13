import React, { useState } from 'react'
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";

export default function Login() {

  const [credentials, setcredentials]=useState({email:"",password:""})

  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ email: credentials.email, password: credentials.password }));
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
  
    const json = await response.json();
    console.log(json);
  
    if (!json.success) {
      alert("Enter valid Credentials.");
    }
  
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"))
      navigate("/");
    }
  }
  

    function onChange(event) {
        setcredentials({ ...credentials, [event.target.name]: event.target.value });
    }

  return (
    <div className='background'>
      <div className='center'>
        <div className='wrapper'>
        <form action="" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="input-box">
              <input type="email" placeholder='Email Address' name='email' value={credentials.email} onChange={onChange} />
              <FaUser className='icon' />
            </div>

            <div className="input-box">
              <input type="password" placeholder='Password' name='password' value={credentials.password} onChange={onChange}/>
              <FaLock className='icon'/>
            </div>

            <div className="remember-forgot">
              <label><input type="checkbox" />Remember me</label>
              <a href="#">Forgot password?</a>
            </div>

            <button type="submit">Login</button>

            <div className="register-link">
              <p>Don't have an account? <a href="/createuser">Register</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
