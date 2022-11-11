import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode'
import { AppContext, UserContext } from '../../../AppContext';
import { EllipsisVerticalIcon, HeartIcon, PaperAirplaneIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

function Header() {
    const Navigate = useNavigate()
    const { userData, setUserData } = useContext(UserContext);
    const { setShowEditPostModal } = useContext(AppContext);

    const [homePost, setHomePost] = useState([])
    // const myPosts = () => {
    //     axios.get('http://localhost:5000/profile', {
    //         headers: {
    //             "x-access-token": localStorage.getItem("userToken"),
    //         },
    //     }).then((response) => {
    //         let user = jwtDecode(localStorage.getItem("userToken"))
    //         setUserData({
    //             id: user.user.split(' ')[0],
    //             name: user.user.split(' ')[1]
    //         })
    //         setHomePost(response.data)
    //     })
    // }
    // useEffect(() => {
    //     allPost()
    // }, [Navigate]);
  return (
    <>
          <div className='mx-auto max-w-7xl flex justify-between gap-3 w-12/12 bg-[#314f5f6e] rounded-[10px] p-[15px] text-white items-center'>
              <div className='flex gap-5 items-center w-4/12'>
                  <div className='border-[3px] rounded-[10px] min-w-[100px] h-[100px] bg-cover' style={{ backgroundImage: `url('https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80')` }}></div>
                  <div className=''>
                      <h4 className='text-[18px] font-semibold'>Alex McCarthy <small className='font-normal text-[#83A2B4]'>&nbsp; &nbsp; @Alex_McCarthy</small></h4>
                      <p className=' font-light text-[#83A2B4] inline-block pr-5'>alex@gmail.com</p>
                      <p className=' font-light text-[#83A2B4] inline-block'>9778013518</p>
                      <p className=' font-light text-[#a8c2d1] block pt-1' style={{ 'display': '-webkit-box', '-webkit-line-clamp': '2', '-webkit-box-orient': 'vertical', 'overflow': 'hidden' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo officia, sapiente, temporibus consequatur dolorum reprehenderit voluptatem, tenetur suscipit magni alias veritatis rerum labore nostrum ad impedit. Explicabo sit assumenda delectus.</p>
                  </div>
              </div>
              <div className='flex gap-20'>
                  <div className='text-center'>
                      <p>22</p>
                      <p>Posts</p>
                  </div>
                  <div className='text-center'>
                      <p>5673</p>
                      <p>Followers</p>
                  </div>
                  <div className='text-center'>
                      <p>2493</p>
                      <p>Following</p>
                  </div>
              </div>
              <div className=' px-4 min-w-[70px] py-3 border-[2px] hover:bg-[#314f5f6e] transition-all rounded-[5px] flex justify-center items-center gap-2 md:px-8 cursor-pointer'> Edit Profile</div>

          </div>
    </>
  )
}

export default Header
