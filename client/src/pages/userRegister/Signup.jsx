import React, { useEffect } from 'react';
import Register from '../../components/register/Register';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';



function Signup() {
  const Navigate = useNavigate()

  useEffect(() => {
    const userAuthenticeted = () => {
      axios.get("http://localhost:5000/isUserAuth", {
        headers: {
          "x-access-token": localStorage.getItem("userToken"),
        },
      }).then((response) => {
        if (response.data.auth) Navigate('/')
        else Navigate("/signup");
      });
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
