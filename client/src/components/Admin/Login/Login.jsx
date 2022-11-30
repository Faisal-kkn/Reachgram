import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

function Login() {
    const Navigate = useNavigate()

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [loginErr, setLoginErr] = useState({
        errMsg: ''
    })

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setLoginData({
            ...loginData,
            [name]: value
        })
    }

    const AdminSubmit = () => {
        axios.post('http://localhost:5000/admin/adminLogin', loginData).then((response) => {
            if (response.data.status && response.data.auth) {
                localStorage.setItem("adminToken", response.data.token)
                Navigate('/admin/dashboard')
            } else {
                setLoginErr({
                    errMsg: response.data.message
                })
            }
        })
    }

    return (
        <div>
            <section className="bg-[#0F213E]  dark:bg-[#0F213E] ">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-[#0F213E] dark:text-white">
                        <img className="w-8 h-8 mr-2" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="logo" />
                        {/* Flowbite */}
                    </a>
                    <div className="w-full bg-white rounded-[6px] shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-5 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-[#0F213E]  md:text-2xl dark:text-white">
                                Sign in
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(AdminSubmit)} >
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#0F213E] dark:text-white">Email</label>
                                    <input type="email" {...register('email', {
                                        required: true,
                                        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                    })} value={loginData.email} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-[#0F213E] sm:text-sm rounded-[6px] focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                    {errors.email && <p className='text-[13px] text-red-600'>Please check the Email</p>}
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#0F213E] dark:text-white">Password</label>
                                    <input type="password" {...register('password', { required: true })} value={loginData.password} onChange={handleChange} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-[#0F213E] sm:text-sm rounded-[6px] focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    {errors.password && <p className='text-[13px] text-red-600'>Required</p>}
                                </div>
                                <p className='text-[13px] text-red-600'>{loginErr.errMsg}</p>

                                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-[6px] text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-[#0F213E] ">Sign in</button>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login
