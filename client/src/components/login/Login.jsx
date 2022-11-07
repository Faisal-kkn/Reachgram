import React, {useState} from 'react';
import './login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios'

function Login() {
    const Navigate = useNavigate()

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

    const loginSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/login', login).then((response) => {
            if (response.data.status){
                Navigate('/')
            }else{
                setLoginErr({
                    errMsg: response.data.message
                })
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
                                  <h3 className='font-semibold text-white text-[35px] sm:text-[48px]'>Login your account<span className='text-[#006FC0]'>.</span></h3>
                                  <p className='text-white font-light text-[14px] mt-[15px]'>Create new account? <NavLink to='/signup'><span className='text-[#006FC0] text-[16px] font-normal'> &nbsp; &nbsp; Signup</span></NavLink></p>
                              </div>
                              <div className='w-full mt-[30px] sm:mt-[50px]'>
                                  <form onSubmit={loginSubmit}>
                                      <div className='flex flex-wrap flex-col justify-between'>
                                          <div className='bg-[#182D39] w-full px-3 rounded-[5px] h-fit pb-1'>
                                              <label for='f-name' className='text-[13px]  text-[#596C7A]'>Email</label>
                                              <input onChange={handleDataChange} value={login.email} name='email' id='f-name' type="email" className='w-full h-[30px] bg-transparent text-white focus:outline-none' />
                                          </div>
                                          <div className='bg-[#182D39] w-full px-3 rounded-[5px] h-fit pb-1 mt-4'>
                                              <label for='l-name' className='text-[13px]  text-[#596C7A]'>Password</label>
                                              <input onChange={handleDataChange} value={login.password} name='password' id='l-name' type="password" className='w-full h-[30px] bg-transparent text-white focus:outline-none' />
                                          </div>
                                          <p className='text-[13px] text-red-600'>{loginErr.errMsg}</p>
                                          <button className='border-2 border-[#ffffff80] w-fit px-5 py-3 text-white rounded-[5px] mt-4'>LOGIN</button>
                                          <p className='text-white font-light text-[14px] mt-[15px]'>Forgot <NavLink to='/'><span className='text-[#006FC0] text-[16px] font-normal'> &nbsp; Password!</span></NavLink></p>
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
