import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode'
import { AppContext, UserContext } from '../../../AppContext';
function Header({ data, handleSubmit, editbutton }) {
    const Navigate = useNavigate()
    const { editProfile, setEditProfile, setEditProfileErr } = useContext(AppContext);

    const [userDetails, setUserDetails] = useState([])
    const ProfileData = () => {
        let userDetail = jwtDecode(localStorage.getItem("userToken"))
        axios.get(`http://localhost:5000/profiledata?userId=${userDetail.user.split(' ')[0]}`, {
            headers: {
                "x-access-token": localStorage.getItem("userToken"),
            }
        }).then((response) => {
            setUserDetails(response.data[0])
        })
    }

    const submitProfile = () => {
        const formData = new FormData();
        for (let key in editProfile) {
            formData.append(key, editProfile[key])
        }
        axios.put('http://localhost:5000/editProfile', formData, {
            headers: {
                "x-access-token": localStorage.getItem("userToken"),
            }
        }).then((response) => {
            if (response.data.status == false){
                setEditProfileErr({ username: response.data.username, email: response.data.email, msg: response.data.msg })
            } else{
                ProfileData()
                setEditProfile({ status: false, phone: userDetails.phone, email: userDetails.email, about: userDetails.about, profile: userDetails.profile, fullname: userDetails.fullname, username: userDetails.username })
                setEditProfile({ ...editProfile, status: false })
            }
        })
    }
    useEffect(() => {
        ProfileData()
    }, [Navigate, submitProfile]);


    return (
        <>
            <div className='mx-auto max-w-7xl flex justify-between flex-col md:flex-row  gap-3 w-12/12 bg-[#314f5f6e] rounded-[10px] p-[15px] text-white items-center'>
                <div className='flex gap-5 items-center w-full lg:w-4/12'>
                    <div className='border-[3px] rounded-[10px] min-w-[100px] h-[100px] bg-cover' style={{ backgroundImage: `url(${'/images/' + userDetails.profile || 'https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'})` }}></div>
                    <div className=''>
                        <h4 className='text-[18px] font-semibold'>{userDetails.fullname} <small className='font-normal text-[#83A2B4] lowercase'>&nbsp; &nbsp; @{userDetails.username}</small></h4>
                        <p className=' font-light text-[#83A2B4] inline-block pr-5'>{userDetails.email}</p>
                        <p className=' font-light text-[#83A2B4] inline-block'>{userDetails.phone}</p>
                        <p className=' font-light text-[#a8c2d1] block pt-1' style={{ 'display': '-webkit-box', '-webkit-line-clamp': '2', '-webkit-box-orient': 'vertical', 'overflow': 'hidden' }}>{userDetails.about ? userDetails.about : 'write your about'}</p>
                    </div>
                </div>
                <div className='flex gap-20'>
                    <div className='text-center'>
                        <p>{data}</p>
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
                {editProfile.status ?

                    editbutton ? <div className=' px-4 min-w-[70px] py-3 border-[2px] hover:bg-[#314f5f6e] transition-all rounded-[5px] flex justify-center items-center gap-2 md:px-8 cursor-pointer' onClick={() => setEditProfile({ ...editProfile, status: false })}> cancel</div> : <div className=' px-4 min-w-[70px] py-3 border-[2px] hover:bg-[#314f5f6e] transition-all rounded-[5px] flex justify-center items-center gap-2 md:px-8 cursor-pointer' onClick={handleSubmit(submitProfile)}> Save</div>
                    : <div className=' px-4 min-w-[70px] py-3 border-[2px] hover:bg-[#314f5f6e] transition-all rounded-[5px] flex justify-center items-center gap-2 md:px-8 cursor-pointer' onClick={() => setEditProfile({ status: true, phone: userDetails.phone, email: userDetails.email, about: userDetails.about, profile: userDetails.profile, fullname: userDetails.fullname, username: userDetails.username })}> Edit Profile</div>}
            </div>
        </>
    )
}

export default Header
