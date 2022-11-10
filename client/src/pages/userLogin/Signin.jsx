import React, { useEffect } from 'react'
import Login from '../../components/login/Login'
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
function Signin() {
  const Navigate = useNavigate()

  useEffect(() => {
    userAuthenticeted()
  }, [Navigate]);

  const userAuthenticeted = () => {
    axios.get("http://localhost:5000/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("userToken"),
      },
    }).then((response) => {
      if (response.data.auth) Navigate('/')
      else Navigate("/login");
    });
  };

  return (
    <div>
      <Login />
    </div>
  )
}

export default Signin
