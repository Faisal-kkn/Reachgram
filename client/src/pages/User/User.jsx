import React, { useEffect, useContext } from 'react'
import UserProfile from '../../components/UserProfile/UserProfile'
import axios from 'axios';
import { NavLink, useNavigate ,useLocation } from 'react-router-dom';
import { UserContext } from '../../AppContext';
import { userAuth } from '../../Api/UserApi/UserRequest'

function User() {    
  const Navigate = useNavigate()
  const userProfileData = useLocation({ isLoading: true }).state?.user
  const { userData } = useContext(UserContext);

  useEffect(() => {
    userAuthenticeted()
  }, [Navigate]);

  const userAuthenticeted = async () => {
    try {
      const { data } = await userAuth()
       if (data.auth) { 
        if (userData.id != userProfileData._id) {
          Navigate("/UserProfile"); 
        } else {
          Navigate('/profile')
        }
      }
      else Navigate("/login");
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

export default User
