import React, { useState, useEffect } from 'react'
import './register.css'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form";

import { userRegister, userRegisterOtp } from '../../Api/UserApi/UserRequest'

function Register() {
  const Navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [email, setEmail] = useState({ email: '' });
  const [registerErr, setRegisterErr] = useState({ emailErrMsg: '', usernameErrMsg: '' });
  const [otpErr, setOtpErr] = useState({ errMsg: '' });
  const [showModal, setShowModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [otpValue, setOtpValue] = useState({ otp1: '', otp2: '', otp3: '', otp4: '', otp5: '', otp6: '' });
  const [registerData, setRegisterData] = useState({ fullname: '', username: '', phone: '', email: '', password: '' });
  const handleDataChange = (e) => {
    const { name, value } = e.target
    setOtpValue({
      ...otpValue,
      [name]: value
    })
  }

  const otpSubmit = async (e) => {
    e.preventDefault()
    try {
      let mergedData = {
        otpNum: otpValue.otp1 + otpValue.otp2 + otpValue.otp3 + otpValue.otp4 + otpValue.otp5 + otpValue.otp6,
        email: email.email
      }

      const { data } = await userRegisterOtp(mergedData)
      if (data.otpVerify) {
        Navigate('/login')
      } else {
        setOtpErr({
          errMsg: data.message
        })
      }
    } catch (error) {
      console.log(error, 'catch error');
    }
  }



  const handleChange = (e) => {
    const { name, value } = e.target
    console.log(value);
    setRegisterData({
      ...registerData,
      [name]: value
    })
  }

  const signUpForm = async (e) => {
    try {
      setShowLoading(true)
      const { data } = await userRegister(registerData)
      setShowLoading(false)
      if (data.username === false) {
        setRegisterErr({ ...registerErr, usernameErrMsg: data.msg })
      } else if (data.msg) {
        setRegisterErr({
          ...registerErr,
          emailErrMsg: data.msg
        })
      } else {
        setEmail({
          email: data.email
        })
        setShowModal(true)
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
                  <h3 className='font-semibold text-white text-[35px] sm:text-[48px]'>Create new account<span className='text-[#006FC0]'>.</span></h3>
                  <p className='text-white font-light text-[14px] mt-[15px]'>Already A Member? <NavLink to='/login'><span className='text-[#006FC0] text-[16px] font-normal'> &nbsp; &nbsp; Signin</span></NavLink></p>
                </div>
                <div className='w-full mt-[30px] sm:mt-[50px]'>

                  <form onSubmit={handleSubmit(signUpForm)} >
                    <div className='w-full mt-[50px]'>
                      <div className='flex flex-wrap justify-between'>
                        <div className='inline-block bg-[#182D39] w-[48%] px-3 rounded-[5px] h-fit pb-1'>
                          <label htmlFor='fullname' className='text-[13px] text-[#596C7A]'>Full Name</label>
                          <input {...register('fullname', { required: true, minLength: 3 })} value={registerData.fullname} onChange={handleChange} id='fullname' type="text" className='w-full h-[30px] bg-transparent text-white focus:outline-none' />
                          {errors.fullname && <p className='text-[13px] text-red-600'>Please check the Name</p>}
                        </div>
                        <div className='inline-block  bg-[#182D39] w-[48%] px-3 rounded-[5px] h-fit pb-1'>
                          <label htmlFor='username' className='text-[13px]  text-[#596C7A]'>User Name</label>
                          <input {...register('username', { required: true, pattern: /^@?(\w){1,15}$/ })} value={registerData.username} onChange={handleChange} id='username' type="text" className='w-full h-[30px] bg-transparent text-white focus:outline-none' />
                          {errors.username && <p className='text-[13px] text-red-600'>Please check the user</p>}
                          <p className='text-[13px] text-red-600'>{registerErr.usernameErrMsg}</p>
                        </div>
                      </div>
                      <div className='flex flex-wrap flex-col justify-between'>
                        <div className='bg-[#182D39] w-full px-3 rounded-[5px] h-fit pb-1 mt-4'>
                          <label htmlFor='phone' className='text-[13px] text-[#596C7A]'>Phone</label>
                          <input  {...register('phone', { required: true, maxLength: 10, pattern: /^[0-9]{10}$/ })} value={registerData.phone} onChange={handleChange} id='phone' type="tel" className='w-full h-[30px] bg-transparent text-white focus:outline-none' />
                          {errors.phone && <p className='text-[13px] text-red-600'>Please check the Phone Number</p>}
                        </div>
                        <div className='bg-[#182D39] w-full px-3 rounded-[5px] h-fit pb-1 mt-4'>
                          <label htmlFor='email' className='text-[13px]  text-[#596C7A]'>Email</label>
                          <input {...register('email', {
                            required: true,
                            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                          })}
                            value={registerData.email} onChange={handleChange} id='email' type="email" className='w-full h-[30px] bg-transparent text-white focus:outline-none' />
                          {errors.email && <p className='text-[13px] text-red-600'>Please check the Email</p>}
                          <p className='text-[13px] text-red-600'>{registerErr.emailErrMsg}</p>
                        </div>
                        <div className='bg-[#182D39] w-full px-3 rounded-[5px] h-fit pb-1 mt-4'>
                          <label htmlFor='password' className='text-[13px]  text-[#596C7A]'>Password</label>
                          <input {...register('password', { required: true, minLength: 6 })} value={registerData.password} onChange={handleChange} id='password' type="password" className='w-full h-[30px] bg-transparent text-white focus:outline-none' />
                          {errors.password && <p className='text-[13px] text-red-600'>min length 6</p>}
                        </div>
                        <button className='border-2 border-[#ffffff80] w-fit px-5 py-3 text-white rounded-[5px] mt-4'>SIGN UP</button>
                      </div>
                    </div>
                  </form>
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
      <>
        {showModal ? (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                    <form onSubmit={otpSubmit} className="otp-form" name="otp-form">

                      <div className="title">
                        <h3>OTP VERIFICATION</h3>
                        {/* <p className="info">An otp has been sent to ********k876@gmail.com</p> */}
                      </div>
                      <div className="otp-input-fields">
                        <input onChange={handleDataChange} value={otpValue.otp1} name='otp1' type="number" className="otp__digit otp__field__1" />
                        <input onChange={handleDataChange} value={otpValue.otp2} name='otp2' type="number" className="otp__digit otp__field__2" />
                        <input onChange={handleDataChange} value={otpValue.otp3} name='otp3' type="number" className="otp__digit otp__field__3" />
                        <input onChange={handleDataChange} value={otpValue.otp4} name='otp4' type="number" className="otp__digit otp__field__4" />
                        <input onChange={handleDataChange} value={otpValue.otp5} name='otp5' type="number" className="otp__digit otp__field__5" />
                        <input onChange={handleDataChange} value={otpValue.otp6} name='otp6' type="number" className="otp__digit otp__field__6" />
                      </div>
                      <p className='text-[13px] text-center text-red-600'>{otpErr.errMsg}</p>
                      <div className="flex items-center justify-center p-3 pb-0 border-t border-solid border-slate-200 rounded-b">
                        {otpValue.otp1 && otpValue.otp2 && otpValue.otp3 && otpValue.otp4 && otpValue.otp5 && otpValue.otp6 ? <button className=" bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"> SEND </button> : ''}
                      </div>
                    </form>
                  </div>
                  {/*footer*/}

                </div>
              </div>
            </div>
            <div className="fixed inset-0 z-40 bg-[#0f213eed]"></div>
          </>
        ) : null}
      </>
    </>


  )
}



var otp_inputs = document.querySelectorAll(".otp__digit")
var mykey = "0123456789".split("")
otp_inputs.forEach((_) => {
  _.addEventListener("keyup", handle_next_input)
})
function handle_next_input(event) {
  var current = event.target
  var index = parseInt(current.classList[1].split("__")[2])
  current.value = event.key

  if (event.keyCode == 8 && index > 1) {
    current.previousElementSibling.focus()
  }
  if (index < 6 && mykey.indexOf("" + event.key + "") != -1) {
    var next = current.nextElementSibling;
    next.focus()
  }
  var _finalKey = ""
  for (var { value } of otp_inputs) {
    _finalKey += value
  }
  if (_finalKey.length == 6) {
    document.querySelector("#_otp").classList.replace("_notok", "_ok")
    document.querySelector("#_otp").innerText = _finalKey
  } else {
    document.querySelector("#_otp").classList.replace("_ok", "_notok")
    document.querySelector("#_otp").innerText = _finalKey
  }
}



export default Register
