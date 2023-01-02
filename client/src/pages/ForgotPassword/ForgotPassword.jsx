import React, { useEffect } from 'react'
import Forgot from '../../components/Forgot/Forgot'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userAuth } from '../../Api/UserApi/UserRequest'


export default function ForgotPassword() {
    const Navigate = useNavigate()

    const userAuthenticeted = async () => {
        try {
            const { data } = await userAuth()
            if (data.auth) Navigate('/')
            else Navigate("/forgot");
        } catch (error) {
            console.log(error, 'catch error');
        }
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
