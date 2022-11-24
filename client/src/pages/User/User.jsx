import React, { useEffect, useContext } from 'react'
import UserProfile from '../../components/UserProfile/UserProfile'
import axios from 'axios';
import { NavLink, useNavigate ,useLocation } from 'react-router-dom';
import { UserContext } from '../../AppContext';

function User() {    
  const Navigate = useNavigate()
  const userProfileData = useLocation({ isLoading: true }).state?.user
  const { userData } = useContext(UserContext);

  useEffect(() => {
    userAuthenticeted()
  }, [Navigate]);

  const userAuthenticeted = () => {
    axios.get("http://localhost:5000/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("userToken"),
      }
    }).then((response) => {
      if (response.data.auth) { 
        if (userData.id != userProfileData._id) {
          Navigate("/UserProfile"); 
        } else {
          Navigate('/profile')
        }
      }
      else Navigate("/login");
    });
  };

  
    
  return (
      <>
      <UserProfile />
      </>
  )
}

export default User
