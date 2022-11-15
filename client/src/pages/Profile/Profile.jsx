import React, { useEffect } from 'react'
import UserProfile from '../../components/Profile/Profile'
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

function Profile() {    
  const Navigate = useNavigate()
  useEffect(() => {
    userAuthenticeted()
  }, [Navigate]);

  const userAuthenticeted = () => {
    axios.get("http://localhost:5000/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("userToken"),
      }
    }).then((response) => {
      console.log('dddd');
      if (response.data.auth) { Navigate("/profile"); }
      else Navigate("/login");
    });
  };
  
    
  return (
      <>
          <UserProfile />
      </>
  )
}

export default Profile
