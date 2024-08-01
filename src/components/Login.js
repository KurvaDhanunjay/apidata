import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [form, setForm] = useState({
    user_email: '',
    user_password: '',
  });

  const navigate = useNavigate();

  const onClickChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const onClickSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://syoft.dev/Api/userlogin/api/userlogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    localStorage.setItem('user', JSON.stringify(data));
    navigate('/dashboard');
  };
  const onClickSingUp =()=> {
    navigate('/',{replace:true})
  }

  return (
    <div className='bg-container'> 
          <div className="login-container">
              <h2>Log In</h2>
              <form onSubmit={onClickSubmit}>
                <label for="emailId" >Email address </label>
                <input type="email" name="user_email" id='emailId' placeholder="username@gmail.com" value={form.user_email} onChange={onClickChange} required />
                <label for="passwordId" >Password</label>
                <input type="password" name="user_password" id='passwordId' placeholder="Password" value={form.user_password} onChange={onClickChange} required />
                <button type="submit">Log In</button>
              </form>
              <p>Don't have an account? <span onClick={onClickSingUp}>Sign Up</span></p>
          </div>
    </div>
    
  );
}

export default Login;
