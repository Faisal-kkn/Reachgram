import React, { useState } from 'react'
import './register.css'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form";

function Register() {
  const Navigate = useNavigate()
  const { register, handleSubmit, watch, formState: { errors } } = useForm();


  const [email, setEmail] = useState({
    email: ''
  })
  const [emailErr, setEmailErr] = useState({
    errMsg: ''
  })
  const [otpErr, setOtpErr] = useState({
    errMsg: ''
  })
  const [showModal, setShowModal] = useState(false);
  const [otpValue, setOtpValue] = useState({
    otp1: '', otp2: '',  otp3: '', otp4: '',  otp5: '', otp6: ''
  })

  const handleDataChange = (e) => {
    const { name, value } = e.target
    setOtpValue({
      ...otpValue,
      [name]: value
    })
  }

  const otpSubmit = (e) => {
    console.log('otpValue');
    e.preventDefault()
    let mergedData = {
      otpNum : otpValue.otp1 + otpValue.otp2 + otpValue.otp3 + otpValue.otp4 + otpValue.otp5 + otpValue.otp6,
      email: email.email
    }
    axios.post('http://localhost:5000/otpvarification', mergedData).then((response) => {
      if (response.data.otpVerify) {
        Navigate('/login')
      } else {
        console.log(response);
        setOtpErr({
          errMsg: response.data.message
        })
        console.log(otpErr);
      }
    }) 
    // console.log(merged);
    // setShowModal(false)
  }
  
  const [registerData, setRegisterData] = useState({
    fname: '',
    lname: '',
    phone: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    console.log(value);
    setRegisterData({
      ...registerData,
      [name]: value
    })
  }

  const signUpForm =(e)=>{
    axios.post('http://localhost:5000/signup', registerData).then((response)=>{
      console.log(response);
      if (response.data.msg){
        setEmailErr({
          errMsg: response.data.msg
        })
      }else{
        setEmail({
          email: response.data.email
        })
        setShowModal(true)
      }
    })
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
                          <label htmlFor='f-name' className='text-[13px] text-[#596C7A]'>First Name</label>
                          <input {...register('fname', { required: true, minLength: 3 })} value={registerData.fname} onChange={handleChange} id='f-name' type="text" className='w-full h-[30px] bg-transparent text-white focus:outline-none' />
                          {errors.fname && <p className='text-[13px] text-red-600'>Please check the First Name</p>}
                        </div>
                        <div className='inline-block  bg-[#182D39] w-[48%] px-3 rounded-[5px] h-fit pb-1'>
                          <label htmlFor='l-name' className='text-[13px]  text-[#596C7A]'>Last Name</label>
                          <input {...register('lname', { required: true })} value={registerData.lname} onChange={handleChange} id='l-name' type="text" className='w-full h-[30px] bg-transparent text-white focus:outline-none' />
                          {errors.lname && <p className='text-[13px] text-red-600'>Please check the Last Name</p>}
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
                            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                            value={registerData.email} onChange={handleChange} id='email' type="email" className='w-full h-[30px] bg-transparent text-white focus:outline-none' />
                          {errors.email && <p className='text-[13px] text-red-600'>Please check the Email</p>}
                        </div>
                        <p className='text-[13px] text-red-600'>{emailErr.errMsg}</p>
                        <div className='bg-[#182D39] w-full px-3 rounded-[5px] h-fit pb-1 mt-4'>
                          <label htmlFor='password' className='text-[13px]  text-[#596C7A]'>Password</label>
                          <input {...register('password', { required: true, minLength: 6})} value={registerData.password} onChange={handleChange} id='password' type="password" className='w-full h-[30px] bg-transparent text-white focus:outline-none' />
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
                        <p className="info">An otp has been sent to ********k876@gmail.com</p>
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
                        {otpValue.otp1 && otpValue.otp2 && otpValue.otp3 && otpValue.otp4 && otpValue.otp5 && otpValue.otp6 ? <button className=" bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"> Save Changes </button> : ''}
                      </div>
                    </form>
                  </div>
                  {/*footer*/}
                  
                </div>
              </div>
            </div>
            <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
    </>


  )}

 

  var otp_inputs = document.querySelectorAll(".otp__digit")
  var mykey = "0123456789".split("")
  otp_inputs.forEach((_) => {
    _.addEventListener("keyup", handle_next_input)
  })
  function handle_next_input(event) {
    let current = event.target
    let index = parseInt(current.classList[1].split("__")[2])
    current.value = event.key

    if (event.keyCode == 8 && index > 1) {
      current.previousElementSibling.focus()
    }
    if (index < 6 && mykey.indexOf("" + event.key + "") != -1) {
      let next = current.nextElementSibling;
      next.focus()
    }
    let _finalKey = ""
    for (let { value } of otp_inputs) {
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
