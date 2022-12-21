import React, { useEffect, useState, useContext, useRef} from 'react'
import { useLocation } from 'react-router-dom'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import './chat.css';
// import { io } from 'socket.io-client';
import axios from 'axios';
import { UserContext, AppContext } from '../../AppContext';
import jwtDecode from 'jwt-decode';
import Conversation from './Conversation/Conversation';
import Message from './Message/Message';

function Chat({ socket }) {
    const { userData, setUserData } = useContext(UserContext);
    const { showSingleChat, setShowSingleChat } = useContext(AppContext);
    const userChatId = useLocation({ isLoading: true }).state?.chatId
    const [ChatList, setChatList] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState(null)
    const [arrivalMessages, setArrivalMessages] = useState(null)

    const scrollRef = useRef()
    const [onlineUsers, setOnlineUsers] = useState([])
    // const [socket, setSocket] = useState(null)
    const [newMessage, setNewMessage] = useState('')
    const [chatProfile, setChatProfile] = useState([])

    // useEffect(() => {
    //     setSocket(io('http://localhost:5000'))
    // }, [])

    useEffect(()=>{
        arrivalMessages && currentChat?.members.includes(arrivalMessages.sender) && 
            setMessages((prev) => [...prev, arrivalMessages])
    },[arrivalMessages, currentChat])

    useEffect(() => {
        // if (!socket) return;
        // socket?.emit("addUser", userData.id)
        socket?.on("getUsers", users=>{
            setOnlineUsers(users)
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
    }, [socket, messages, arrivalMessages])

    const chatSubmit = (e) => {
        e.preventDefault()
        const message = {
            sender: userData.id,
            text: newMessage,
            conversationId: currentChat._id
        }

        const reciverId = currentChat.members.find(member => member !== userData.id)

        socket?.emit('send-message', { 
            senderId: userData.id,
            reciverId: reciverId,
            text: newMessage, 
         });
        console.log('socket.id');
        console.log(socket.id);
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

    const getUser = async (conversation) => {
        const friendId = conversation.members?.find((member) => member != userData.id)
        axios.get('http://localhost:5000/chat/users?friendId=' + friendId).then((response) => {
            setChatProfile(response.data[0])
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
                <div className={`w-full   md:w-5/12 lg:w-3/12 bg-[#314f5f6e] rounded-[10px] p-[15px] text-white sm:block ${showSingleChat ? 'hidden' : 'block'}`}>
                    <div className="max-w-sm ">
                        <div className="relative">
                            <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"  fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input type="text" placeholder="Search" name='search' className="w-full py-2 pl-12 pr-4  text-gray-500 rounded-[5px] outline-none bg-[#314e5e6e] focus:bg-[#314F5F] focus:border-indigo-600" />
                        </div>
                        <div className='mt-3 flex flex-col gap-3 overflow-y-scroll h-[85vh] lg:h-[77vh] md:h-[85vh] sm:h-[90vh] scrollbar-hide'>
                            {ChatList.map((chat, index) => {
                                return (
                                    <div onClick={() => {
                                        setCurrentChat(chat)
                                        getUser(chat)
                                        setShowSingleChat(true)
                                    }} key={index}>
                                        <Conversation key={index} currentChatId={currentChat?._id} conversation={chat} currentUser={userData.id}  />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className={`lg:w-9/12 md:w-7/12 w-full md:block text-white ${showSingleChat ? '' : 'hidden'}`}>
                    <div className={`h-full lg:h-[88vh] md:h-fit sm:h-[90vh] p-[15px]  text-white rounded-[10px] ${currentChat ? 'bg-[#314f5f6e]' : 'bg-[#fff]' }`} >
                        {
                            currentChat ?
                                <>
                                    <div>
                                        <div className='flex gap-3 items-center pb-3'>
                                            <div className='w-[50px] h-[50px]  overflow-hidden relative'>
                                                <img className='rounded-full' src={'/images/' + chatProfile?.profile} alt="" />
                                                <span className='w-[15px] h-[15px] bg-green-500 absolute bottom-[2px] right-0 rounded-full'></span>
                                            </div>
                                            <div >
                                                <div className='flex items-center'>
                                                    <h4 className='leading-4 overflow-hidden pr-5 overflow-ellipsis whitespace-nowrap text-white inline-block max-w-[250px]'>{chatProfile?.fullname}</h4>
                                                    {/* <small className='leading-3 overflow-hidden max-w-[250px] overflow-ellipsis whitespace-nowrap text-[#596C7A] inline-block'>@alex_mc_carthy</small> */}
                                                </div>
                                                <small className='mt-[5px] overflow-hidden overflow-ellipsis whitespace-nowrap text-[#596C7A] block'>Online</small>
                                            </div>
                                        </div>

                                        <div className='overflow-y-scroll h-[75vh] lg:h-[67vh] md:h-[77vh] sm:h-[90vh] p-[15px] text-black scrollbar-hide'>
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
                                : 
                                <div className='h-full my-auto'>
                                    <img className='lg:h-[80%] lg:w-auto md:h-auto md:w-full mx-auto my-auto' src="/assets/Messaging.gif" alt="" />
                                    <h1 className='text-black text-center font-bold text-[20px]'>Start Your Chat</h1>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat
