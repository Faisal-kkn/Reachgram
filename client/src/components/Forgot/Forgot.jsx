import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form";

import { passwordForgot, OtpForm } from '../../Api/UserApi/UserRequest'



function Forgot() {
    const notify = () => toast.success('Password Changed !', {
        position: toast.POSITION.TOP_RIGHT
    });

    const Navigate = useNavigate();
    const [showLoading, setShowLoading] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [forgotData, setForgotData] = useState({ email: '', otp: '', password: '' });
    const [forgotErr, setForgotErr] = useState({ email: false, otp: false, msg: '', emailStatus: false });

    const fogotForm = async (e) => {
        try {
            setShowLoading(true)
            const { data } = await passwordForgot({ email: forgotData.email })

            if (!data.status) {
                 setForgotErr({ ...forgotErr, email: true, msg: data.message })
                setShowLoading(false)
            } else{
                setForgotErr({ ...forgotErr, email: false, msg: '', emailStatus: true })
                setShowLoading(false)
            }

        } catch (error) {
            console.log(error, 'catch error');
        }
    }

    const fogotOtpForm = async (e) =>{
        console.log('forgotDataaaaaaaaaaaaa');
        console.log(forgotData);

        try {
            const { data } = await OtpForm(forgotData)

            if (data.status == false) {
                setForgotErr({ ...forgotErr, emailStatus: false })
            } else {
                if (!data.otpVerify) setForgotErr({ ...forgotErr, otp: true, msg: data.message })
                else {
                    setTimeout(() => {
                        setForgotData({ email: '', otp: '', password: '' })
                        setForgotErr({ email: false, otp: false, msg: '', emailStatus: false })
                        setShowLoading(false)
                        Navigate('/login')
                    }, 3000);
                    setShowLoading(true)
                    notify()
                }
            }
        } catch (error) {
            console.log(error, 'catch error');
        }
    }

    return (
        <div>
            <ToastContainer />

            <section className='main-bg z-0'>
                <div className="container">
                    <div className="row min-h-[100vh] z-0">
                        <div className="flex mx-auto items-center z-10 w-10/12 justify-center sm:p-8 sm:mx-0 min-h-[100vh] sm:w-6/12 md:w-7/12 lg:w-4/12">
                            <div>
                                <div className='w-full'>
                                    <p className='text-white font-light text-[14px] mb-[10px] '>START FOR FREE</p>
                                    <h3 className='font-semibold text-white text-[35px] sm:text-[48px]'>Forgot Password<span className='text-[#006FC0]'>.</span></h3>
                                    <p className='text-white font-light text-[14px] mt-[15px]'>Already A Member? <NavLink to='/login'><span className='text-[#006FC0] text-[16px] font-normal'> &nbsp; &nbsp; Signin</span></NavLink></p>
                                </div>
                                <div className='w-full mt-[30px] sm:mt-[50px]'>

                                    {forgotErr.emailStatus ? 
                                    <form onSubmit={handleSubmit(fogotOtpForm)} >
                                        <div className='w-full mt-[50px]'>

                                            <div className='flex flex-wrap flex-col justify-between'>
                                                <div className='bg-[#182D39] w-full px-3 rounded-[5px] h-fit pb-1 mt-4'>
                                                    <label htmlFor='otp' className='text-[13px]  text-[#596C7A]'>OTP</label>
                                                        <input {...register('otp', { required: true, maxLength: 6, minLength: 6 })} value={forgotData.otp} onChange={(e) => setForgotData({ ...forgotData, otp: e.target.value })} id='otp' type="text" className='w-full h-[30px] bg-transparent text-white focus:outline-none' />
                                                    {errors.otp && <p className='text-[13px] text-red-600'>Length is 6</p>}
                                                    <p className='text-[13px] text-red-600'>{forgotErr.otp && forgotErr.msg}</p>
                                                </div>
                                                <div className='bg-[#182D39] w-full px-3 rounded-[5px] h-fit pb-1 mt-4'>
                                                    <label htmlFor='password' className='text-[13px]  text-[#596C7A]'>New Password</label>
                                                    <input {...register('password', { required: true, minLength: 6 })} value={forgotData.password} onChange={(e) => setForgotData({ ...forgotData, password: e.target.value })} id='password' type="password" className='w-full h-[30px] bg-transparent text-white focus:outline-none' />
                                                    {errors.password && <p className='text-[13px] text-red-600'>min length 6</p>}
                                                </div>
                                                <button type='submit' className='border-2 border-[#ffffff80] w-fit px-5 py-3 text-white rounded-[5px] mt-4'>SUBMIT</button>
                                            </div>
                                        </div>

                                    </form>
                                        : <form onSubmit={handleSubmit(fogotForm)} >
                                            <div className='w-full mt-[50px]'>

                                                <div className='flex flex-wrap flex-col justify-between'>
                                                    <div className='bg-[#182D39] w-full px-3 rounded-[5px] h-fit pb-1 mt-4'>
                                                        <label htmlFor='email' className='text-[13px]  text-[#596C7A]'>Email</label>
                                                        <input {...register('email', {
                                                            required: true,
                                                            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                                        })} value={forgotData.email} onChange={(e) => setForgotData({ ...forgotData, email: e.target.value })} id='email' type="email" className='w-full h-[30px] bg-transparent text-white focus:outline-none' />
                                                        {errors.email && <p className='text-[13px] text-red-600'>Please check the Email</p>}
                                                        <p className='text-[13px] text-red-600'>{forgotErr.email && forgotErr.msg}</p>
                                                    </div>
                                                    <button className='border-2 border-[#ffffff80] w-fit px-5 py-3 text-white rounded-[5px] mt-4'>SUBMIT</button>
                                                </div>
                                            </div>
                                        </form>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <>
                {showLoading ? (<div role="status" className='bg-[#0f213eed] mx-auto w-screen my-auto h-screen z-0 absolute top-0 left-0 flex justify-center items-center'>
                    <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
                    </svg>
                    <span className="sr-only">Loading...</span>
                    {/* <div className="fixed inset-0 z-0 bg-[#0f213eed] "></div> */}

                </div>) : null
                }
            </>
        </div>
    )
}

export default Forgot
