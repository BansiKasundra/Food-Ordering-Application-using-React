import React, { useState } from 'react'
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";

export default function Signup() {
    const [credentials, setcredentials]=useState({name:"",email:"",password:"",geolocation:""})

    let navigate = useNavigate()

    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.geolocation}))
        const response = await fetch("http://localhost:5000/api/createuser",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.geolocation})
        });

        const json = await response.json()
        console.log(json);

        if(!json.success){
            alert("Enter valid Credentials.")
        }

        if(json.success){
          navigate("/login");
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
            <h1>Register</h1>
            <div className="input-box">
              <input type="text" placeholder='Username' name='name' value={credentials.name} onChange={onChange} />
              <FaUser className='icon' />
            </div>

            <div className="input-box">
              <input type="email" placeholder='Email Address' name='email' value={credentials.email} onChange={onChange} />
              <FaUser className='icon' />
            </div>

            <div className="input-box">
              <input type="password" placeholder='Password' name='password' value={credentials.password} onChange={onChange}/>
              <FaLock className='icon'/>
            </div>

            <div className="input-box">
              <input type="text" placeholder='Address' name='geolocation' value={credentials.geolocation} onChange={onChange}/>
              <FaUser className='icon' />
            </div>

            <div className="remember-forgot">
              <label><input type="checkbox" />Remember me</label>
              <a href="#">Forgot password?</a>
            </div>

            <button type="submit">Register</button>

            <div className="register-link">
              <p>Already have an account? <a href="/login">Login</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
