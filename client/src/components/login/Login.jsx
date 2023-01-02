import React, { useState, useContext } from 'react';
import './login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useForm } from "react-hook-form";
import { UserContext } from '../../AppContext'
import jwtDecode from 'jwt-decode'

import { userLogin } from '../../Api/UserApi/UserRequest'


function Login() {
    const { userData, setUserData } = useContext(UserContext);

    const Navigate = useNavigate()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [login, setLogin] = useState({
        email: '',
        password: ''
    })

    const [loginErr, setLoginErr] = useState({
        errMsg: ''
    })

    const handleDataChange = (e) => {
        const { name, value } = e.target
        setLogin({
            ...login,
            [name]: value
        })
    }


    const loginSubmit = async (e) => {
        try {
            const { data } = await userLogin(login)
            if (data.status && data.auth) {
                // let userName = jwtDecode(data.token)
                // console.log(userName);
                // setUserData({ ...userData, id: data.id, name: userName.name })
                localStorage.setItem("userToken", data.token)
                Navigate('/')
            } else {
                setLoginErr({
                    errMsg: data.message
                })
            }
        } catch (error) {
            console.log(error, 'catch error');
        }
    }

    return (
        <>
            <section className='main-bg z-0'>
                <div className="container">
                    <div className="row min-h-[100vh] z-0">
                        <div className="flex mx-auto items-center z-10 w-10/12 justify-center sm:p-8 sm:mx-0 min-h-[100vh] sm:w-6/12 md:w-7/12 lg:w-4/12">
                            <div>
                                <div className='w-full'>
                                    <p className='text-white font-light text-[14px] mb-[10px] '>START FOR FREE</p>
                                    <h3 className='font-semibold text-white text-[35px] sm:text-[48px]'>Login your account<span className='text-[#006FC0]'>.</span></h3>
                                    <p className='text-white font-light text-[14px] mt-[15px]'>Create new account? <NavLink to='/signup'><span className='text-[#006FC0] text-[16px] font-normal'> &nbsp; &nbsp; Signup</span></NavLink></p>
                                </div>
                                <div className='w-full mt-[30px] sm:mt-[50px]'>
                                    <form onSubmit={handleSubmit(loginSubmit)}>
                                        <div className='flex flex-wrap flex-col justify-between'>
                                            <div className='bg-[#182D39] w-full px-3 rounded-[5px] h-fit pb-1'>
                                                <label htmlFor='email' className='text-[13px]  text-[#596C7A]'>Email</label>
                                                <input {...register('email', {
                                                    required: true,
                                                    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                                })} onChange={handleDataChange} value={login.email} id='email' type="email" className='w-full h-[30px] bg-transparent text-white focus:outline-none' />
                                                {errors.email && <p className='text-[13px] text-red-600'>Please check the Email</p>}
                                            </div>
                                            <div className='bg-[#182D39] w-full px-3 rounded-[5px] h-fit pb-1 mt-4'>
                                                <label htmlFor='password' className='text-[13px]  text-[#596C7A]'>Password</label>
                                                <input {...register('password', { required: true, minLength: 6 })} onChange={handleDataChange} value={login.password} id='password' type="password" className='w-full h-[30px] bg-transparent text-white focus:outline-none' />
                                                {errors.password && <p className='text-[13px] text-red-600'>min length 6</p>}
                                            </div>
                                            <p className='text-[13px] text-red-600'>{loginErr.errMsg}</p>
                                            <button className='border-2 border-[#ffffff80] w-fit px-5 py-3 text-white rounded-[5px] mt-4'>LOGIN</button>
                                            <p className='text-white font-light text-[14px] mt-[15px]'>Forgot <NavLink to='/forgot'><span className='text-[#006FC0] text-[16px] font-normal'> &nbsp; Password!</span></NavLink></p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login
