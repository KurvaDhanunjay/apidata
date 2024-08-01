import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import Cookies from "js-cookie";
import axios from 'axios';

function SignUp() {
  const [formData, setFormData] = useState({
    firstname: '',
    email: '',
    phone: '',
    password: '',
    city: '',
    zipcode: ''
  });

  const navigate = useNavigate();

  const onClickChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitSuccess=(jwtTkoken)=>{
    Cookies.set("jwt_token",jwtTkoken,{
      expires:30,
      path :"/login",
    });
    navigate('./login',{replace:true})
  };

  const onClickSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData
    };

    try {
      const response = await axios.post('https://syoft.dev/Api/user_registeration/api/user_registeration', {
        method: 'POST', 
        headers:{
          'Content-Type': 'application/json()',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });
      //const data=await response.json();
      //console.log(data);
      if(response.ok){
        onSubmitSuccess(response.jwt_token);
      } else{
        alert(response.error_msg);
      }
    } catch(error){
      console.log("Error:",error);
    }
  };

  return (
    <div className='bg-container'>
          <div className='bg-heading'>
            <h1>Welcome to our community </h1>
            <p> Fuse helps developers to build organised and well coded dashboard full of beautiful and rich modules.join us and start building your application today.</p>
          </div>
        <div className="signup-container">
            <div className='sign-headings'>
                <h2>Sign Up</h2>
                <p>Already have an account? <Link to={'./login'}> Sign In</Link> </p>
            </div>
            <form onSubmit={onClickSubmit}>
              <label for="fullName">Full Name</label>
              <input type="text" name="user_firstname" placeholder="Dhanunjay" id='fullName' value={formData.user_firstname} onChange={onClickChange} required />
              <label for="emailId">Email Address</label>
              <input type="email" name="user_email" placeholder="username@gmail.com" id='emailId' value={formData.user_email} onChange={onClickChange} required />
              <label for="phoneNumber">Phone Number</label>
              <input type="number" name="user_phone" placeholder="+91 0000000000" id='phoneNumber' value={formData.user_phone} onChange={onClickChange} required />
              <label for="password">Password</label>
              <input type="password" name="user_password" placeholder="Password" id='password' value={formData.user_password} onChange={onClickChange} required />
              <label for="cityId">City</label>
              <input type="text" name="user_city" placeholder="Gadwal" id='cityId' value={formData.user_city} onChange={onClickChange} required />
              <label for="zipCode">ZipCode</label>
              <input type="number" name="user_zipcode" placeholder="509132" id='zipCode' value={formData.user_zipcode} onChange={onClickChange} required />
              
              <button type="submit" >Create your free account</button>
            </form>
          </div>
    </div>
  );
}

export default SignUp;
