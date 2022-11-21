import React, { useEffect } from 'react'
import Forgot from '../../components/Forgot/Forgot'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ForgotPassword() {
    const Navigate = useNavigate()

    const userAuthenticeted = () => {
        axios.get("http://localhost:5000/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("userToken"),
            },
        }).then((response) => {
            if (response.data.auth) Navigate('/')
            else Navigate("/forgot");
        });
    };

    useEffect(() => {
        userAuthenticeted()
    }, [Navigate]);
  return (
    <div>
          <Forgot />
    </div>
  )
}
