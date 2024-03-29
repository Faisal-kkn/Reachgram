import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../../AppContext';
import { userProfileData, FollowUser, MessageUser } from '../../../Api/UserApi/UserRequest'


function Header({head, data}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const Navigate = useNavigate()
    const { userData } = useContext(UserContext);

    const [userDetails, setUserDetails] = useState({})
    const [userId, setUserId] = useState(head?._id)
    const ProfileData = async () => {
        try {
            const { data } = await userProfileData(head?._id)
            setUserDetails(data[0])
        } catch (error) {
            console.log(error, 'catch error');
        }
    }

    const followAction = async (myId)=>{
        console.log('userId ', userId);
        console.log('myId ', myId);

        try {
            const { data } = await FollowUser({ userId: userDetails?._id, myId })
            ProfileData()
        } catch (error) {
            console.log(error, 'catch error');
        }
    }

    const MessageAction = async (myId, userId)=> {
        try {
            const { data } = await MessageUser({ userId: userDetails._id, myId })
            let chatId = data._id
            Navigate('/chat', { state: { chatId } })
        } catch (error) {
            console.log(error, 'catch error');
        }
    }
   
    useEffect(() => {
        ProfileData()
    }, [Navigate, head]);


    return (
        <>
            <div className='mx-auto max-w-7xl flex justify-between flex-col md:flex-row  gap-3 w-12/12 bg-[#314f5f6e] rounded-[10px] p-[15px] text-white items-center'>
                <div className='flex gap-5 items-center w-full lg:w-4/12'>
                    <div className='border-[3px] rounded-[10px] min-w-[100px] h-[100px] bg-cover' style={{ backgroundImage: `url(${PF + userDetails.profile || 'https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'})` }}></div>
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
                        {userDetails.friends && userDetails.friends.length != 0 ? userDetails.friends[0].followers.length : '0'}
                        <p>Followers</p>
                    </div>
                    <div className='text-center'>
                        {userDetails.friends && userDetails.friends.length != 0 ? userDetails.friends[0].following.length : '0'}
                        <p>Following</p>
                    </div>
                </div>
                <div className='flex gap-5'>
                    <div className=' px-4 min-w-[70px] py-3 border-[2px] hover:bg-[#314f5f6e] transition-all rounded-[5px] flex justify-center items-center gap-2 md:px-8 cursor-pointer' onClick={() => followAction(userData.id)}>{(userDetails.friends && userDetails.friends.length != 0) && (userDetails.friends[0].followers.includes(userData.id) && userDetails.friends[0].following.includes(userData.id) ? 'UnFollow' : userDetails.friends[0].following.includes(userData.id) ? 'Follow Back' : userDetails.friends[0].followers.includes(userData.id) ? 'UnFollow' : 'Follow')}</div>
                    <div className=' px-4 min-w-[70px] py-3 border-[2px] hover:bg-[#314f5f6e] transition-all rounded-[5px] flex justify-center items-center gap-2 md:px-8 cursor-pointer' onClick={() => MessageAction(userData.id, userDetails._id)}>Message</div>
                </div>
            </div>
        </>
    )
}

export default Header
