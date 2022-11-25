import React, { useEffect, useState, useContext, useRef} from 'react'
import { useLocation } from 'react-router-dom'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import './chat.css';
import { io } from 'socket.io-client';
import axios from 'axios';
import { UserContext } from '../../AppContext';
import jwtDecode from 'jwt-decode';
import Conversation from './Conversation/Conversation';
import Message from './Message/Message';

function Chat() {
    const { userData, setUserData } = useContext(UserContext);
    const [ChatList, setChatList] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState(null)
    const [arrivalMessages, setArrivalMessages] = useState(null)
    const scrollRef = useRef()

    const [socket, setSocket] = useState(null)
    
    const [newMessage, setNewMessage] = useState('')
    const userChatId = useLocation({ isLoading: true }).state?.userId

    const [chat, setChat] = useState([])

    useEffect(() => {
        setSocket(io('http://localhost:5000'))
        
    }, [])

    useEffect(()=>{
        arrivalMessages && currentChat?.members.includes(arrivalMessages.sender) && 
            setMessages((prev) => [...prev, arrivalMessages])
    },[arrivalMessages, currentChat])

    useEffect(() => {
        if (!socket) return;
        socket.emit("addUser", userData.id)
        socket.on("getUsers", users=>{
            // console.log(users);
        })
    }, [userData])

    useEffect(() => {
        socket?.on('getMessage', (data) => {
             setArrivalMessages({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            })
        })
    }, [socket])

    const chatSubmit = (e) => {
        e.preventDefault()
        const message = {
            sender: userData.id,
            text: newMessage,
            conversationId: currentChat._id
        }

        const reciverId = currentChat.members.find(member => member !== userData.id)

        socket.emit('send-message', { 
            senderId: userData.id,
            reciverId: reciverId,
            text: newMessage, 
         });
        axios.post('http://localhost:5000/chat/conversation', message).then((response)=>{
            setMessages([...messages, message])
            setNewMessage('')
        })
    }

    const getChatListId = () => {
        let user = jwtDecode(localStorage.getItem("userToken"))
        setUserData({
            ...userData,
            id: user.user.split(' ')[0]
        })
        axios.get(`http://localhost:5000/chat/chatList?userId=${user.user.split(' ')[0]}`).then((response) => {
            setChatList(response.data)
        })

    }

    useEffect(() => {
        getChatListId()
    }, [userData.id])

    const getConversation = (conversationId) => {
        axios.get(`http://localhost:5000/chat/conversation?conversationId=${conversationId}`).then((response) => {
            setMessages(response.data)
        })

    }

    useEffect(() => {
        getConversation(currentChat?._id)
    }, [currentChat])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    }, [messages])

    return (
        <>
            <div className='mx-auto max-w-7xl px-1 sm:px-3 lg:px-2 flex justify-between gap-3 w-12/12 pt-1 md:pt-3'>
                <div className='hidden lg:block w-3/12 bg-[#314f5f6e] rounded-[10px] p-[15px] text-white'>
                    <div className="max-w-sm hidden sm:block">
                        <div className="relative">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            <input type="text" placeholder="Search" name='search' className="w-full py-2 pl-12 pr-4  text-gray-500 rounded-[5px] outline-none bg-[#314e5e6e] focus:bg-[#314F5F] focus:border-indigo-600" />

                        </div>
                        <div className='mt-3 flex flex-col gap-3 overflow-y-scroll h-[85vh] lg:h-[77vh] md:h-[85vh] sm:h-[90vh] scrollbar-hide'>
                            {/* <div className='flex gap-3 items-center bg-white p-3 rounded-[10px] cursor-pointer' onClick={()=>getConversation()} >
                                <div className='w-[50px] h-[50px]  overflow-hidden relative'>
                                    <img className='rounded-full' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                    <span className='w-[15px] h-[15px] bg-green-500 absolute bottom-[2px] right-0 rounded-full'></span>
                                </div>
                                <div >
                                    <h4 className='leading-4 overflow-hidden pr-5 overflow-ellipsis whitespace-nowrap text-[#0F213E] font-bold max-w-[250px]'>Alex McCarthy</h4>
                                    <small className='leading-3 overflow-hidden max-w-[250px] overflow-ellipsis whitespace-nowrap text-[#596C7A]'>@alex_mc_carthy</small>
                                </div>
                            </div> */}

                            {ChatList.map((chat, index) => {
                                return (
                                    <div onClick={() => setCurrentChat(chat)}>
                                        <Conversation key={index} conversation={chat} currentUser={userData.id} />
                                    </div>
                                )
                            })}


                        </div>
                    </div>
                </div>
                <div className='lg:w-9/12 md:w-7/12 block text-white'>
                    {/* <div className='mb-1 md:mb-3 '>
                        <div>
                            <div className='h-full bg-[#314f5f6e] pb-1 pt-[10px] px-2 rounded-[10px] flex overflow-x-scroll w-screen md:w-full scrollbar-hide gap-2 '>

                                <div className='rounded text-center w-[75px]'>
                                    <div className='relative'>
                                        <PlusIcon className='absolute top-[25%] left-[25%] w-10 h-10 z-20 mx-auto text-white opacity-70' />
                                        <img className="p-[2px] border-[3px] w-full rounded-full mx-auto blur-[2px]" src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                    </div>
                                    <div className='overflow-hidden w-[75px] overflow-ellipsis whitespace-nowrap h-[20px] leading-5 text-[#596C7A]'><small>Add Your Story</small></div>
                                </div>
                                <div className='rounded text-center w-[75px]'>
                                    <img className="p-[2px] border-[3px] w-full rounded-full mx-auto" src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                    <div className='overflow-hidden w-[75px] overflow-ellipsis whitespace-nowrap h-[20px] leading-5 text-[#596C7A]'><small>@czxcxzcxzcxzxczcxssssssssssssssssssssssssss</small></div>
                                </div>
                                <div className='rounded text-center w-[75px]'>
                                    <img className="p-[2px] border-[3px] w-full rounded-full mx-auto" src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                    <div className='overflow-hidden w-[75px] overflow-ellipsis whitespace-nowrap h-[20px] leading-5 text-[#596C7A]'><small>@czxcxzcxzcxzxczcxssssssssssssssssssssssssss</small></div>
                                </div>
                                <div className='rounded text-center w-[75px]'>
                                    <img className="p-[2px] border-[3px] w-full rounded-full mx-auto" src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                    <div className='overflow-hidden w-[75px] overflow-ellipsis whitespace-nowrap h-[20px] leading-5 text-[#596C7A]'><small>@czxcxzcxzcxzxczcxssssssssssssssssssssssssss</small></div>
                                </div>
                                <div className='rounded text-center w-[75px]'>
                                    <img className="p-[2px] border-[3px] w-full rounded-full mx-auto" src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                    <div className='overflow-hidden w-[75px] overflow-ellipsis whitespace-nowrap h-[20px] leading-5 text-[#596C7A]'><small>@czxcxzcxzcxzxczcxssssssssssssssssssssssssss</small></div>
                                </div>
                                <div className='rounded text-center w-[75px]'>
                                    <img className="p-[2px] border-[3px] w-full rounded-full mx-auto" src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                    <div className='overflow-hidden w-[75px] overflow-ellipsis whitespace-nowrap h-[20px] leading-5 text-[#596C7A]'><small>@czxcxzcxzcxzxczcxssssssssssssssssssssssssss</small></div>
                                </div>
                                <div className='rounded text-center w-[75px]'>
                                    <img className="p-[2px] border-[3px] w-full rounded-full mx-auto" src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                    <div className='overflow-hidden w-[75px] overflow-ellipsis whitespace-nowrap h-[20px] leading-5 text-[#596C7A]'><small>@czxcxzcxzcxzxczcxssssssssssssssssssssssssss</small></div>
                                </div>

                                <div className='rounded text-center w-[75px]'>
                                    <img className="p-[2px] border-[3px] w-full rounded-full mx-auto" src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                    <div className='overflow-hidden w-[75px] overflow-ellipsis whitespace-nowrap h-[20px] leading-5 text-[#596C7A]'><small>@czxcxzcxzcxzxczcxssssssssssssssssssssssssss</small></div>
                                </div>
                                <div className='rounded text-center w-[75px]'>
                                    <img className="p-[2px] border-[3px] w-full rounded-full mx-auto" src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                    <div className='overflow-hidden w-[75px] overflow-ellipsis whitespace-nowrap h-[20px] leading-5 text-[#596C7A]'><small>@czxcxzcxzcxzxczcxssssssssssssssssssssssssss</small></div>
                                </div>
                                <div className='rounded text-center w-[75px]'>
                                    <img className="p-[2px] border-[3px] w-full rounded-full mx-auto" src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                    <div className='overflow-hidden w-[75px] overflow-ellipsis whitespace-nowrap h-[20px] leading-5 text-[#596C7A]'><small>@czxcxzcxzcxzxczcxssssssssssssssssssssssssss</small></div>
                                </div>
                                <div className='rounded text-center w-[75px]'>
                                    <img className="p-[2px] border-[3px] w-full rounded-full mx-auto" src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                    <div className='overflow-hidden w-[75px] overflow-ellipsis whitespace-nowrap h-[20px] leading-5 text-[#596C7A]'><small>@czxcxzcxzcxzxczcxssssssssssssssssssssssssss</small></div>
                                </div>
                                <div className='rounded text-center w-[75px]'>
                                    <img className="p-[2px] border-[3px] w-full rounded-full mx-auto" src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                    <div className='overflow-hidden w-[75px] overflow-ellipsis whitespace-nowrap h-[20px] leading-5 text-[#596C7A]'><small>@czxcxzcxzcxzxczcxssssssssssssssssssssssssss</small></div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className='h-[85vh] lg:h-[88vh] md:h-[85vh] sm:h-[90vh] p-[15px] bg-[#314f5f6e] text-white rounded-[10px]'>
                        {
                            currentChat ?
                                <>
                                    <div>
                                        <div className='flex gap-3 items-center'>
                                            <div className='w-[50px] h-[50px]  overflow-hidden relative'>
                                                <img className='rounded-full' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                                <span className='w-[15px] h-[15px] bg-green-500 absolute bottom-[2px] right-0 rounded-full'></span>
                                            </div>
                                            <div >
                                                <div className='flex items-center'>
                                                    <h4 className='leading-3 overflow-hidden pr-5 overflow-ellipsis whitespace-nowrap text-white inline-block max-w-[250px]'>Alex McCarthy</h4>
                                                    {/* <small className='leading-3 overflow-hidden max-w-[250px] overflow-ellipsis whitespace-nowrap text-[#596C7A] inline-block'>@alex_mc_carthy</small> */}
                                                </div>
                                                <small className='mt-[5px] overflow-hidden overflow-ellipsis whitespace-nowrap text-[#596C7A] block'>Online</small>
                                            </div>
                                        </div>
                                        <div className='overflow-y-scroll h-[85vh] lg:h-[68vh] md:h-[85vh] sm:h-[90vh] p-[15px] text-black scrollbar-hide'>
                                            {
                                                messages.map((msg, index)=>{
                                                    return(
                                                        <div key={index} ref={scrollRef}>
                                                            <Message message={msg} own={msg.sender === userData.id} />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>

                                        <div className='pt-4 pb-1'>
                                            <form onSubmit={chatSubmit}>
                                                <div className='flex items-center h-[50px] border-[#314F5F] border-[2px] bg-[#05141c2b] rounded-[10px] px-[10px]'>
                                                    <div className='w-[95%] h-full'>
                                                        <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className='w-full border-transparent bg-transparent outline-none h-full' />
                                                    </div>
                                                    <div className='ml-auto  px-2'>
                                                        <button type="submit"><PaperAirplaneIcon className='w-6 h-6 ' /></button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </>
                                : 'Please start the chat'
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat
