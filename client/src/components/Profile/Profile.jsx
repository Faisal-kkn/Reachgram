import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode'
import { AppContext, UserContext } from '../../AppContext';
import { EllipsisVerticalIcon, HeartIcon, PaperAirplaneIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import ProfilHead from './Header/Header'
import './profile.css'
import { useForm } from "react-hook-form";

function Profile() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const Navigate = useNavigate()
    const { userData, setUserData } = useContext(UserContext);
    const { editProfile, setEditProfile, editProfileErr } = useContext(AppContext);

    console.log('editProfile');
    console.log(editProfile);
    const [profilePosts, setProfilePosts] = useState([])
    const [editProfileBtn, setEditProfileBtn] = useState(true)
    const [profilePostsId, setProfilePostsId] = useState({
        postMainId: ''
    })

    const myPosts = async () => {
        let userDetails = jwtDecode(localStorage.getItem("userToken"))

        await axios.get(`http://localhost:5000/profile?userId=${userDetails.user.split(' ')[0]}`, {
            headers: {
                "x-access-token": localStorage.getItem("userToken"),
            },
        }).then((response) => {
            console.log('user posts');
            console.log(response);
            if (response.data.auth === false) {
                Navigate("/login");
            } else {
                setProfilePosts(response.data.reverse())
                setProfilePostsId({ postMainId: response.data[0].mainId })
            }
        })

    }
    const handleChange =(e)=>{
        const { name, value } = e.target
        setEditProfileBtn(false)
        setEditProfile({
            ...editProfile,
            [name] : value,
            userId: userData.id
        })
    }
    useEffect(() => {
        myPosts()
    }, [Navigate]);

    const likeAndDisLike = (userId, postId, likedUser) => {
        console.log('userId '+ userId);
        console.log('postId '+ postId);
        console.log('likedUser '+ likedUser);
        let data = {
            userId, postId, likedUser
        }
        console.log(data);
        axios.put(`http://localhost:5000/likeordislike`, data, {
            headers: {
                "x-access-token": localStorage.getItem("userToken")
            },
        }).then((response) => {
            myPosts()
        })
    }

    return (
        <div className='px-1 sm:px-3 lg:px-2 md:pt-3  pt-1'>
            <ProfilHead data={profilePosts.length} handleSubmit={handleSubmit} editbutton={editProfileBtn} />

            <div className={`mx-auto max-w-7xl gap-3 w-12/12 bg-[#314f5f6e] rounded-[10px] p-[15px] text-white mt-[15px] overflow-y-scroll scrollbar-hide ${editProfile.status ? 'h-auto' : 'md:h-[70vh] '}`}>
                {editProfile.status ? <div>
                    {editProfileErr ? <p className='text-[13px] mb-2 text-red-600'>{editProfileErr}</p> : '' }
                    <div className='grid grid-cols-2 gap-5'>
                        <div className='bg-[#182D39] px-3 rounded-[5px] h-fit pb-1 w-full'>
                            <label htmlFor='fullname' className='text-[13px]  text-[#596C7A]'>Full Name</label>
                            <input {...register('fullname', { required: true, minLength: 3 })} value={editProfile.fullname} onChange={handleChange} id='fullname' type="text" className='w-full h-[30px] bg-transparent text-white focus:outline-none' />
                            {errors.fullname && <p className='text-[13px] text-red-600'>Please check the First Name</p>}
                        </div>
                        <div className='bg-[#182D39] px-3 rounded-[5px] h-fit pb-1 w-full'>
                            <label htmlFor='username' className='text-[13px]  text-[#596C7A]'>User Name</label>
                            <input {...register('username', { required: true, pattern: /^@?(\w){1,15}$/ })} value={editProfile.username} onChange={handleChange} id='username' type="text" className='w-full h-[30px] bg-transparent text-white focus:outline-none' />
                            {errors.username && <p className='text-[13px] text-red-600'>Please check the User Name</p>}
                        </div>
                        <div className='bg-[#182D39] px-3 rounded-[5px] h-fit pb-1 w-full'>
                            <label htmlFor='email' className='text-[13px]  text-[#596C7A]'>Email</label>
                            <input {...register('email', {
                                required: true,
                                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            })} id='email' type="email" onChange={handleChange} className='w-full h-[30px] bg-transparent text-white focus:outline-none' value={editProfile.email} />
                            {errors.email && <p className='text-[13px] text-red-600'>Please check the Email</p>}
                        </div>
                        <div className='bg-[#182D39] px-3 rounded-[5px] h-fit pb-1 w-full'>
                            <label htmlFor='phone' className='text-[13px]  text-[#596C7A]'>Phone</label>
                            <input {...register('phone', { required: true, maxLength: 10, pattern: /^[0-9]{10}$/ })} value={editProfile.phone} onChange={handleChange} id='phone' type="tel" className='w-full h-[30px] bg-transparent text-white focus:outline-none' />
                            {errors.phone && <p className='text-[13px] text-red-600'>Please check the Phone Number</p>}
                        </div>
                        <div className='bg-[#182D39] px-3 rounded-[5px] h-fit pb-1 w-full'>
                            <label htmlFor='profile' className='text-[13px]  text-[#596C7A]'>Profile</label>
                            <input name='profile' id='profile' onChange={(e) => setEditProfile({ ...editProfile, profile : e.target.files[0] })}   type="file" className='w-full h-[30px] bg-transparent text-white focus:outline-none pb-[10px]' />
                            {/* {errors.profile && <p className='text-[13px] text-red-600'>Please check the Profile</p>} */}
                        </div>
                        <div className='bg-[#182D39] px-3 rounded-[5px] h-fit pb-1 w-full'>
                            <label htmlFor='about' className='text-[13px]  text-[#596C7A]'>About</label>
                            <textarea name='about' value={editProfile.about} id='about' onChange={handleChange} className='w-full h-[30px] bg-transparent text-white focus:outline-none' rows="10" ></textarea>
                            {/* {errors.about && <p className='text-[13px] text-red-600'>Please check the About</p>} */}
                        </div>
                    </div>
                </div> :
                    profilePosts.length === 0 ? <div className='w-full bg-[#f8f8fa]'><img className='mx-auto h-full' src="https://cdn.dribbble.com/users/1785628/screenshots/5605512/media/097297f8e21d501ba45d7ce437ed77bd.gif" alt="" /></div> :
                            <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-5 items-center'>
                                {profilePosts.reverse().map((iteam, index) => {
                                    return (
                                        <div key={index} className='rounded-[10px] bg-cover h-[300px] overflow-hidden relative hover-main'>
                                            <div className='border-[4px] rounded-[10px] bg-cover h-full w-full overflow-hidden absolute' style={{ borderImage: "linear-gradient(#83A2B4, #50809B) 30" }}></div>
                                            <div className='rounded-[10px] overflow-hidden h-full w-full p-1'>
                                                <img key={index} className='w-full h-full' src={`/images/${iteam.image}`} alt="" />
                                            </div>
                                            <div className='hover-data flex gap-5 justify-center items-center'>
                                                <div key={index} onClick={() => likeAndDisLike(profilePostsId.postMainId, iteam._id, userData.id)} className=' cursor-pointer min-w-[70px] py-3 bg-[rgba(49,79,95,0.4)] rounded-[5px] flex justify-center items-center gap-2 md:px-8 h-fit'><HeartIcon className={`w-6 h-6 ${iteam.Likes.includes(userData.id) ? 'text-red-600' : 'text-white'} `} /> <span className='text-[16px]'>{iteam.Likes.length}</span></div>
                                                <div className=' min-w-[70px] py-3 bg-[#314f5f6e] rounded-[5px] flex justify-center items-center gap-2 md:px-8 h-fit'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                                                    </svg>
                                                </div>
                                                <div className=' min-w-[70px] py-3 bg-[#314f5f6e] rounded-[5px] flex justify-center items-center gap-2 md:px-8 h-fit'><PaperAirplaneIcon className='w-6 h-6 rotate-[-45deg]' /></div>
                                            </div>
                                        </div>
                                    )
                                })}
                    </div>
                }
            </div>

        </div>
    )
}

export default Profile
