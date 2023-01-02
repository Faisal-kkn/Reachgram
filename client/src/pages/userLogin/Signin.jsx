import React, { useEffect } from 'react'
import Login from '../../components/login/Login'
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userAuth } from '../../Api/UserApi/UserRequest'

function Signin() {
  const Navigate = useNavigate()

  const userAuthenticeted = async () => {
    try {
      const { data } = await userAuth()
      if (data.auth) Navigate('/')
      else Navigate("/login");
    } catch (error) {
      console.log(error, 'catch error');
    }
  };

  useEffect(() => {
    userAuthenticeted()
  }, [Navigate]);

  return (
    <div>
      <Login />
    </div>
  )
}

export default Signin
