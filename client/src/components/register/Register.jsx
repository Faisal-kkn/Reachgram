import React, { useState } from 'react'
import './register.css'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
function Register() {
  const Navigate = useNavigate()

  const [register, setRegister] = useState({
    fname: '',
    lname: '',
    phone: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    console.log(value);
    setRegister({
      ...register,
      [name]: value
    })
  }

  const signUpForm =(e)=>{
    console.log('dsssss');
    console.log(register);
    e.preventDefault()
    axios.post('http://localhost:5000/signup', register).then((res)=>{

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

                  <form onSubmit={signUpForm} >
                    <div className='w-full mt-[50px]'>
                      <div className='flex flex-wrap justify-between'>
                        <div className='inline-block bg-[#182D39] w-[48%] px-3 rounded-[5px] h-fit pb-1'>
                          <label for='f-name' className='text-[13px] text-[#596C7A]'>First Name</label>
                          <input name='fname' value={register.fname} onChange={handleChange} id='f-name' type="text" className='w-full h-[30px] bg-transparent text-white focus:outline-none' />
                        </div>
                        <div className='inline-block  bg-[#182D39] w-[48%] px-3 rounded-[5px] h-fit pb-1'>
                          <label for='l-name' className='text-[13px]  text-[#596C7A]'>Last Name</label>
                          <input name='lname' value={register.lname} onChange={handleChange} id='l-name' type="text" className='w-full h-[30px] bg-transparent text-white focus:outline-none' />
                        </div>
                      </div>
                      <div className='flex flex-wrap flex-col justify-between'>
                        <div className='bg-[#182D39] w-full px-3 rounded-[5px] h-fit pb-1 mt-4'>
                          <label for='phone' className='text-[13px] text-[#596C7A]'>Phone</label>
                          <input name='phone' value={register.phone} onChange={handleChange} id='phone' type="tel" className='w-full h-[30px] bg-transparent text-white focus:outline-none' />
                        </div>
                        <div className='bg-[#182D39] w-full px-3 rounded-[5px] h-fit pb-1 mt-4'>
                          <label for='email' className='text-[13px]  text-[#596C7A]'>Email</label>
                          <input name='email' value={register.email} onChange={handleChange} id='email' type="email" className='w-full h-[30px] bg-transparent text-white focus:outline-none' />
                        </div>
                        <div className='bg-[#182D39] w-full px-3 rounded-[5px] h-fit pb-1 mt-4'>
                          <label for='password' className='text-[13px]  text-[#596C7A]'>Password</label>
                          <input name='password' value={register.password} onChange={handleChange} id='password' type="password" className='w-full h-[30px] bg-transparent text-white focus:outline-none' />
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
    </>
  )
}

export default Register
