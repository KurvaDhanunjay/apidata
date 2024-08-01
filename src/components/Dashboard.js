import { useNavigate,} from 'react-router-dom'
import React from 'react';
import './Dashboard.css';
import Cookie from "js-cookie";
function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const onClickLogout = () => {
    Cookie.remove("jwt_token");
    navigate('/login',{replace:true})
  };

  return (
    <div className="dashboard-container">
      <nav className='navBar'>
        <h1>Syoft</h1>
        <button className='button' onClick={onClickLogout} >Logout</button>
      </nav>
      <p>Welcome, {user?.user_firstname}</p>
      <h1>Welcome to our community</h1>
      
      <p>Fuse helps developers to build organised and well coded dashboard full of beautiful and rich modules.join us and start building your application today.</p>
      <button className='button'> <a href='https://www.syoft.com/' target='_blank' rel="noreferrer" >Explore </a></button>
    </div>
  );
}

export default Dashboard;