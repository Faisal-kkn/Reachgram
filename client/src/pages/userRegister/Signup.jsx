import React, { useEffect } from 'react';
import Register from '../../components/register/Register';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { userAuth } from '../../Api/UserApi/UserRequest'


function Signup() {
  const Navigate = useNavigate()

  useEffect(() => {
    const userAuthenticeted = async () => {
      try {
        const { data } = await userAuth()
        if (data.auth) Navigate('/')
        else Navigate("/signup");
      } catch (error) {
        console.log(error, 'catch error');
      }
    };
    userAuthenticeted()
  }, [Navigate]);

  

  return (
    <div>
      <Register />
    </div>
  )
}

export default Signup
