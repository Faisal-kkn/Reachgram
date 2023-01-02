import React, { useEffect } from 'react'
import UserProfile from '../../components/Profile/Profile'
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { userAuth } from '../../Api/UserApi/UserRequest'

function Profile() {    
  const Navigate = useNavigate()
  useEffect(() => {
    userAuthenticeted()
  }, [Navigate]);

  const userAuthenticeted = async () => {
    try {
      const { data } = await userAuth()
      if (data.auth) Navigate("/profile")
      else Navigate("/signup");
    } catch (error) {
      console.log(error, 'catch error');
    }
  };
  
    
  return (
      <>
          <UserProfile />
      </>
  )
}

export default Profile
