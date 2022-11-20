import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../AppContext';
import {  HeartIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';
import ProfilHead from './Header/Header'
import './UserProfile.css'

function UserProfile() {

    const Navigate = useNavigate()
    
    const [profilePosts, setProfilePosts] = useState([])
    const { userData } = useContext(UserContext);
    const userProfileData = useLocation().state?.user
    // const [userProfileDatas, setUserProfileDatas] = useState(useLocation().state?.user)

    const [profilePostsId, setProfilePostsId] = useState({
        postMainId: ''
    })

    let userPost = () => {
        // setUserProfileDatas(...userProfileDatas, userProfileData)
        axios.get(`http://localhost:5000/profile?userId=${userProfileData?._id}`, {
            headers: {
                "x-access-token": localStorage.getItem("userToken"),
            },
        }).then((response) => {
            if (response.data.auth === false) {
                Navigate("/login");
            } else {
                console.log('responseeeeeeeeeeeeee');
                console.log(response);
                setProfilePosts(response.data.reverse())
                setProfilePostsId({ postMainId: response.data[0].mainId })
            }
        })

    }


    const likeAndDisLike = (userId, postId, likedUser) => {
        console.log('userId ' + userId);
        console.log('postId ' + postId);
        console.log('likedUser ' + likedUser);
        let data = {
            userId, postId, likedUser
        }
        console.log(data);
        axios.put(`http://localhost:5000/likeordislike`, data, {
            headers: {
                "x-access-token": localStorage.getItem("userToken")
            },
        }).then((response) => {
            userPost()
        })
    }


    useEffect(() => {
        userPost()
    }, [Navigate, userProfileData]);

    return (
        <div className='px-1 sm:px-3 lg:px-2 md:pt-3  pt-1'>
            <ProfilHead head={userProfileData} data={profilePosts.length} />

            <div className={`mx-auto max-w-7xl gap-3 w-12/12 bg-[#314f5f6e] rounded-[10px] p-[15px] text-white mt-[15px] overflow-y-scroll scrollbar-hide md:h-[70vh]`}>
                {profilePosts.length === 0 ? <div className='w-full bg-[#f8f8fa]'><img className='mx-auto h-full' src="https://cdn.dribbble.com/users/1785628/screenshots/5605512/media/097297f8e21d501ba45d7ce437ed77bd.gif" alt="" /></div> :
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

export default UserProfile
