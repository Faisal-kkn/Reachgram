import React, { useState, useContext, useEffect } from 'react'
import './leftSideBar.css'
import { io } from 'socket.io-client';
import { UserContext } from "../../AppContext";
import axios from 'axios';
import jwtDecode from 'jwt-decode';

function LeftSideBar() {
    const { userData, setUserData } = useContext(UserContext);

    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [friends, setFriends] = useState([])
    const [onlineFriends, setOnlineFriends] = useState([])
    const [onlineFriendsData, setOnlineFriendsData] = useState([])

    useEffect(() => {
        setSocket(io('http://localhost:5000'))
        getFriends()
    }, [])
    const getFriends = () => {
        let user = jwtDecode(localStorage.getItem("userToken"))
        setUserData({
            ...userData,
            id: user.user.split(' ')[0]
        })
        axios.get('http://localhost:5000/friends?userId=' + user.user.split(' ')[0], {
            headers: {
                "x-access-token": localStorage.getItem("userToken"),
            },
        }).then((response) => {
            setFriends([...response.data[0]?.following])
        })
    }

    useEffect(() => {
        console.log('onlineeeeeeeeeeeee usersssssssssssssss');
        if (!socket) return;
        socket.emit("addUser", userData.id)
        socket.on("getUsers", users => {
            console.log(users);
            setOnlineUsers(users)
        })
    }, [userData, socket])

    const getUser = async (online) => {
        
        console.log(online);
        let onlineUser = JSON.stringify(online) 
        axios.get('http://localhost:5000/onlineFriends?friendId[]=' + onlineUser, {
            headers: {
                "x-access-token": localStorage.getItem("userToken"),
            },
        }).then((response) => {
            setOnlineFriendsData(response.data)
            console.log('responsesssssssssss');
            console.log(response);
        })
    }


    useEffect(()=>{
        console.log('friendssss');
        console.log(friends);
        
        // console.log('onlineUsers.includes');
        setOnlineFriends(onlineUsers.filter(f => friends.includes(f.userId)))
        // setOnlineFriends(friends.filter(f => console.log(onlineUsers.includes(f))))
        let onlineFriendsArr = []
        onlineFriends.map((item)=>{
            onlineFriendsArr.push(item.userId !== userData.id && item.userId )
        })
        console.log('onlineFriendsArr');
        console.log(onlineFriendsArr);
        console.log('onlinefriendsssssss');
        console.log(onlineFriends);
       
        getUser(onlineFriendsArr)
    },[friends, onlineUsers])


    return (
        <div>
            <div className='h-full bg-[#314f5f6e] rounded-[10px] p-[15px] text-white  '>
                <h6>Online</h6>{/*   */}
                <div className='mt-2 max-h-[80vh] overflow-x-scroll scrollbar-hide'>
                    {
                        onlineFriendsData?.map((onUser, index)=>{
                            return(
                                <div className='my-2 flex gap-3 items-center' key={index}>
                                    <div className='w-[50px] h-[50px]  overflow-hidden relative'>
                                        <img className='rounded-full' src={'/images/'+onUser.profile} alt="" />
                                        <span className='w-[15px] h-[15px] bg-green-500 absolute bottom-[2px] right-0 rounded-full'></span>
                                    </div>
                                    <div>
                                        <h4 className='leading-3 overflow-hidden w-[150px] overflow-ellipsis whitespace-nowrap text-white'>{onUser.fullname}</h4>
                                        <small className='overflow-hidden w-[150px] overflow-ellipsis whitespace-nowrap text-[#596C7A]'>@{onUser.username}</small>
                                    </div>
                                </div>
                            )
                        })
                    }
                    
                    {/* <div className='my-2 flex gap-3 items-center'>
                        <div className='w-[50px] h-[50px]  overflow-hidden relative'>
                            <img className='rounded-full' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                            <span className='w-[15px] h-[15px] bg-green-500 absolute bottom-[2px] right-0 rounded-full'></span>
                        </div>
                        <div>
                            <h4 className='leading-3 overflow-hidden w-[150px] overflow-ellipsis whitespace-nowrap text-white'>Alex McCarthy</h4>
                            <small className='overflow-hidden w-[150px] overflow-ellipsis whitespace-nowrap text-[#596C7A]'>@alex_mcCarthy</small>
                        </div>
                    </div>
                    <div className='my-2 flex gap-3 items-center'>
                        <div className='w-[50px] h-[50px]  overflow-hidden relative'>
                            <img className='rounded-full' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                            <span className='w-[15px] h-[15px] bg-green-500 absolute bottom-[2px] right-0 rounded-full'></span>
                        </div>
                        <div>
                            <h4 className='leading-3 overflow-hidden w-[150px] overflow-ellipsis whitespace-nowrap text-white'>Alex McCarthy</h4>
                            <small className='overflow-hidden w-[150px] overflow-ellipsis whitespace-nowrap text-[#596C7A]'>@alex_mcCarthy</small>
                        </div>
                    </div>
                    <div className='my-2 flex gap-3 items-center'>
                        <div className='w-[50px] h-[50px]  overflow-hidden relative'>
                            <img className='rounded-full' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                            <span className='w-[15px] h-[15px] bg-green-500 absolute bottom-[2px] right-0 rounded-full'></span>
                        </div>
                        <div>
                            <h4 className='leading-3 overflow-hidden w-[150px] overflow-ellipsis whitespace-nowrap text-white'>Alex McCarthy</h4>
                            <small className='overflow-hidden w-[150px] overflow-ellipsis whitespace-nowrap text-[#596C7A]'>@alex_mcCarthy</small>
                        </div>
                    </div>
                    <div className='my-2 flex gap-3 items-center'>
                        <div className='w-[50px] h-[50px]  overflow-hidden relative'>
                            <img className='rounded-full' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                            <span className='w-[15px] h-[15px] bg-green-500 absolute bottom-[2px] right-0 rounded-full'></span>
                        </div>
                        <div>
                            <h4 className='leading-3 overflow-hidden w-[150px] overflow-ellipsis whitespace-nowrap text-white'>Alex McCarthy</h4>
                            <small className='overflow-hidden w-[150px] overflow-ellipsis whitespace-nowrap text-[#596C7A]'>@alex_mcCarthy</small>
                        </div>
                    </div>
                    <div className='my-2 flex gap-3 items-center'>
                        <div className='w-[50px] h-[50px]  overflow-hidden relative'>
                            <img className='rounded-full' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                            <span className='w-[15px] h-[15px] bg-green-500 absolute bottom-[2px] right-0 rounded-full'></span>
                        </div>
                        <div>
                            <h4 className='leading-3 overflow-hidden w-[150px] overflow-ellipsis whitespace-nowrap text-white'>Alex McCarthy</h4>
                            <small className='overflow-hidden w-[150px] overflow-ellipsis whitespace-nowrap text-[#596C7A]'>@alex_mcCarthy</small>
                        </div>
                    </div>
                    <div className='my-2 flex gap-3 items-center'>
                        <div className='w-[50px] h-[50px]  overflow-hidden relative'>
                            <img className='rounded-full' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                            <span className='w-[15px] h-[15px] bg-green-500 absolute bottom-[2px] right-0 rounded-full'></span>
                        </div>
                        <div>
                            <h4 className='leading-3 overflow-hidden w-[150px] overflow-ellipsis whitespace-nowrap text-white'>Alex McCarthy</h4>
                            <small className='overflow-hidden w-[150px] overflow-ellipsis whitespace-nowrap text-[#596C7A]'>@alex_mcCarthy</small>
                        </div>
                    </div>
                    <div className='my-2 flex gap-3 items-center'>
                        <div className='w-[50px] h-[50px]  overflow-hidden relative'>
                            <img className='rounded-full' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                            <span className='w-[15px] h-[15px] bg-green-500 absolute bottom-[2px] right-0 rounded-full'></span>
                        </div>
                        <div>
                            <h4 className='leading-3 overflow-hidden w-[150px] overflow-ellipsis whitespace-nowrap text-white'>Alex McCarthy</h4>
                            <small className='overflow-hidden w-[150px] overflow-ellipsis whitespace-nowrap text-[#596C7A]'>@alex_mcCarthy</small>
                        </div>
                    </div>
                    <div className='my-2 flex gap-3 items-center'>
                        <div className='w-[50px] h-[50px]  overflow-hidden relative'>
                            <img className='rounded-full' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                            <span className='w-[15px] h-[15px] bg-green-500 absolute bottom-[2px] right-0 rounded-full'></span>
                        </div>
                        <div>
                            <h4 className='leading-3 overflow-hidden w-[150px] overflow-ellipsis whitespace-nowrap text-white'>Alex McCarthy</h4>
                            <small className='overflow-hidden w-[150px] overflow-ellipsis whitespace-nowrap text-[#596C7A]'>@alex_mcCarthy</small>
                        </div>
                    </div>
                    <div className='my-2 flex gap-3 items-center'>
                        <div className='w-[50px] h-[50px]  overflow-hidden relative'>
                            <img className='rounded-full' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                            <span className='w-[15px] h-[15px] bg-green-500 absolute bottom-[2px] right-0 rounded-full'></span>
                        </div>
                        <div>
                            <h4 className='leading-3 overflow-hidden w-[150px] overflow-ellipsis whitespace-nowrap text-white'>Alex McCarthy</h4>
                            <small className='overflow-hidden w-[150px] overflow-ellipsis whitespace-nowrap text-[#596C7A]'>@alex_mcCarthy</small>
                        </div>
                    </div>
                    <div className='my-2 flex gap-3 items-center'>
                        <div className='w-[50px] h-[50px]  overflow-hidden relative'>
                            <img className='rounded-full' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                            <span className='w-[15px] h-[15px] bg-green-500 absolute bottom-[2px] right-0 rounded-full'></span>
                        </div>
                        <div>
                            <h4 className='leading-3 overflow-hidden w-[150px] overflow-ellipsis whitespace-nowrap text-white'>Alex McCarthy</h4>
                            <small className='overflow-hidden w-[150px] overflow-ellipsis whitespace-nowrap text-[#596C7A]'>@alex_mcCarthy</small>
                        </div>
                    </div>
                    <div className='my-2 flex gap-3 items-center'>
                        <div className='w-[50px] h-[50px]  overflow-hidden relative'>
                            <img className='rounded-full' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                            <span className='w-[15px] h-[15px] bg-green-500 absolute bottom-[2px] right-0 rounded-full'></span>
                        </div>
                        <div>
                            <h4 className='leading-3 overflow-hidden w-[150px] overflow-ellipsis whitespace-nowrap text-white'>Alex McCarthy</h4>
                            <small className='overflow-hidden w-[150px] overflow-ellipsis whitespace-nowrap text-[#596C7A]'>@alex_mcCarthy</small>
                        </div>
                    </div>
                    <div className='my-2 flex gap-3 items-center'>
                        <div className='w-[50px] h-[50px]  overflow-hidden relative'>
                            <img className='rounded-full' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                            <span className='w-[15px] h-[15px] bg-green-500 absolute bottom-[2px] right-0 rounded-full'></span>
                        </div>
                        <div>
                            <h4 className='leading-3 overflow-hidden w-[150px] overflow-ellipsis whitespace-nowrap text-white'>Alex McCarthy</h4>
                            <small className='overflow-hidden w-[150px] overflow-ellipsis whitespace-nowrap text-[#596C7A]'>@alex_mcCarthy</small>
                        </div>
                    </div>
                    <div className='my-2 flex gap-3 items-center'>
                        <div className='w-[50px] h-[50px]  overflow-hidden relative'>
                            <img className='rounded-full' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                            <span className='w-[15px] h-[15px] bg-green-500 absolute bottom-[2px] right-0 rounded-full'></span>
                        </div>
                        <div>
                            <h4 className='leading-3 overflow-hidden w-[150px] overflow-ellipsis whitespace-nowrap text-white'>Alex McCarthy</h4>
                            <small className='overflow-hidden w-[150px] overflow-ellipsis whitespace-nowrap text-[#596C7A]'>@alex_mcCarthy</small>
                        </div>
                    </div>
                    <div className='my-2 flex gap-3 items-center'>
                        <div className='w-[50px] h-[50px]  overflow-hidden relative'>
                            <img className='rounded-full' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                            <span className='w-[15px] h-[15px] bg-green-500 absolute bottom-[2px] right-0 rounded-full'></span>
                        </div>
                        <div>
                            <h4 className='leading-3 overflow-hidden w-[150px] overflow-ellipsis whitespace-nowrap text-white'>Alex McCarthy</h4>
                            <small className='overflow-hidden w-[150px] overflow-ellipsis whitespace-nowrap text-[#596C7A]'>@alex_mcCarthy</small>
                        </div>
                    </div>
                    <div className='my-2 flex gap-3 items-center'>
                        <div className='w-[50px] h-[50px]  overflow-hidden relative'>
                            <img className='rounded-full' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                            <span className='w-[15px] h-[15px] bg-green-500 absolute bottom-[2px] right-0 rounded-full'></span>
                        </div>
                        <div>
                            <h4 className='leading-3 overflow-hidden w-[150px] overflow-ellipsis whitespace-nowrap text-white'>Alex McCarthy</h4>
                            <small className='overflow-hidden w-[150px] overflow-ellipsis whitespace-nowrap text-[#596C7A]'>@alex_mcCarthy</small>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default LeftSideBar
