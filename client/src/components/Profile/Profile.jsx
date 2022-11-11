import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode'
import { AppContext, UserContext } from '../../AppContext';
import { EllipsisVerticalIcon, HeartIcon, PaperAirplaneIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import ProfilHead from './Header/Header'

import './profile.css'

function Profile() {
    const Navigate = useNavigate()
    const { userData, setUserData } = useContext(UserContext);
    const { setShowEditPostModal } = useContext(AppContext);

    const [homePost, setHomePost] = useState([])
    let user = jwtDecode(localStorage.getItem("userToken"))
    setUserData({
        id: user.user.split(' ')[0],
        name: user.user.split(' ')[1]
    })
    const myPosts = () => {
        axios.get(`http://localhost:5000/profile?userId=${userData.id}`, {
            headers: {
                "x-access-token": localStorage.getItem("userToken"),
            },
        }).then((response) => {
            // setHomePost(response.data)
        })
    }
    useEffect(() => {
        myPosts()
    }, [Navigate]);

  return (
      <div className='px-1 sm:px-3 lg:px-2 md:pt-3  pt-1'>
          <ProfilHead />
          
          <div className='mx-auto max-w-7xl gap-3 w-12/12 bg-[#314f5f6e] rounded-[10px] p-[15px] text-white mt-[15px] h-[70vh] overflow-y-scroll scrollbar-hide'>
              <div className='grid grid-cols-3 gap-5 items-center'>
                  
                  <div className='rounded-[10px] bg-cover h-[300px] overflow-hidden relative hover-main'>
                      <div className='border-[4px] rounded-[10px] bg-cover h-full w-full overflow-hidden absolute' style={{ borderImage: "linear-gradient(#83A2B4, #50809B) 30" }}></div>
                      <div className='rounded-[10px] overflow-hidden h-full w-full p-1'>
                          <img className='w-full' src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                      </div>
                      <div className='hover-data flex gap-5 justify-center items-center'>
                          <div className=' cursor-pointer min-w-[70px] py-3 bg-[rgba(49,79,95,0.4)] rounded-[5px] flex justify-center items-center gap-2 md:px-8 h-fit'><HeartIcon className={`w-6 h-6 `} /> <span className='text-[16px]'></span></div>
                          <div className=' min-w-[70px] py-3 bg-[#314f5f6e] rounded-[5px] flex justify-center items-center gap-2 md:px-8 h-fit'>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                              </svg>
                          </div>
                          <div className=' min-w-[70px] py-3 bg-[#314f5f6e] rounded-[5px] flex justify-center items-center gap-2 md:px-8 h-fit'><PaperAirplaneIcon className='w-6 h-6 rotate-[-45deg]' /></div>
                      </div>
                  </div>
                  <div className='rounded-[10px] bg-cover h-[300px] overflow-hidden relative hover-main'>
                      <div className='border-[4px] rounded-[10px] bg-cover h-full w-full overflow-hidden absolute' style={{ borderImage: "linear-gradient(#83A2B4, #50809B) 30" }}></div>
                      <div className='rounded-[10px] overflow-hidden h-full w-full p-1'>
                          <img className='w-full' src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                      </div>
                      <div className='hover-data flex gap-5 justify-center items-center'>
                          <div className=' cursor-pointer min-w-[70px] py-3 bg-[rgba(49,79,95,0.4)] rounded-[5px] flex justify-center items-center gap-2 md:px-8 h-fit'><HeartIcon className={`w-6 h-6 `} /> <span className='text-[16px]'></span></div>
                          <div className=' min-w-[70px] py-3 bg-[#314f5f6e] rounded-[5px] flex justify-center items-center gap-2 md:px-8 h-fit'>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                              </svg>
                          </div>
                          <div className=' min-w-[70px] py-3 bg-[#314f5f6e] rounded-[5px] flex justify-center items-center gap-2 md:px-8 h-fit'><PaperAirplaneIcon className='w-6 h-6 rotate-[-45deg]' /></div>
                      </div>
                  </div>
                  <div className='rounded-[10px] bg-cover h-[300px] overflow-hidden relative hover-main'>
                      <div className='border-[4px] rounded-[10px] bg-cover h-full w-full overflow-hidden absolute' style={{ borderImage: "linear-gradient(#83A2B4, #50809B) 30" }}></div>
                      <div className='rounded-[10px] overflow-hidden h-full w-full p-1'>
                          <img className='w-full' src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                      </div>
                      <div className='hover-data flex gap-5 justify-center items-center'>
                          <div className=' cursor-pointer min-w-[70px] py-3 bg-[rgba(49,79,95,0.4)] rounded-[5px] flex justify-center items-center gap-2 md:px-8 h-fit'><HeartIcon className={`w-6 h-6 `} /> <span className='text-[16px]'></span></div>
                          <div className=' min-w-[70px] py-3 bg-[#314f5f6e] rounded-[5px] flex justify-center items-center gap-2 md:px-8 h-fit'>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                              </svg>
                          </div>
                          <div className=' min-w-[70px] py-3 bg-[#314f5f6e] rounded-[5px] flex justify-center items-center gap-2 md:px-8 h-fit'><PaperAirplaneIcon className='w-6 h-6 rotate-[-45deg]' /></div>
                      </div>
                  </div>
                  <div className='rounded-[10px] bg-cover h-[300px] overflow-hidden relative hover-main'>
                      <div className='border-[4px] rounded-[10px] bg-cover h-full w-full overflow-hidden absolute' style={{ borderImage: "linear-gradient(#83A2B4, #50809B) 30" }}></div>
                      <div className='rounded-[10px] overflow-hidden h-full w-full p-1'>
                          <img className='w-full' src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                      </div>
                      <div className='hover-data flex gap-5 justify-center items-center'>
                          <div className=' cursor-pointer min-w-[70px] py-3 bg-[rgba(49,79,95,0.4)] rounded-[5px] flex justify-center items-center gap-2 md:px-8 h-fit'><HeartIcon className={`w-6 h-6 `} /> <span className='text-[16px]'></span></div>
                          <div className=' min-w-[70px] py-3 bg-[#314f5f6e] rounded-[5px] flex justify-center items-center gap-2 md:px-8 h-fit'>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                              </svg>
                          </div>
                          <div className=' min-w-[70px] py-3 bg-[#314f5f6e] rounded-[5px] flex justify-center items-center gap-2 md:px-8 h-fit'><PaperAirplaneIcon className='w-6 h-6 rotate-[-45deg]' /></div>
                      </div>
                  </div>
                  <div className='rounded-[10px] bg-cover h-[300px] overflow-hidden relative hover-main'>
                      <div className='border-[4px] rounded-[10px] bg-cover h-full w-full overflow-hidden absolute' style={{ borderImage: "linear-gradient(#83A2B4, #50809B) 30" }}></div>
                      <div className='rounded-[10px] overflow-hidden h-full w-full p-1'>
                          <img className='w-full' src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                      </div>
                      <div className='hover-data flex gap-5 justify-center items-center'>
                          <div className=' cursor-pointer min-w-[70px] py-3 bg-[rgba(49,79,95,0.4)] rounded-[5px] flex justify-center items-center gap-2 md:px-8 h-fit'><HeartIcon className={`w-6 h-6 `} /> <span className='text-[16px]'></span></div>
                          <div className=' min-w-[70px] py-3 bg-[#314f5f6e] rounded-[5px] flex justify-center items-center gap-2 md:px-8 h-fit'>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                              </svg>
                          </div>
                          <div className=' min-w-[70px] py-3 bg-[#314f5f6e] rounded-[5px] flex justify-center items-center gap-2 md:px-8 h-fit'><PaperAirplaneIcon className='w-6 h-6 rotate-[-45deg]' /></div>
                      </div>
                  </div>
                  
              </div>
          </div>
    </div>
  )
}

export default Profile
