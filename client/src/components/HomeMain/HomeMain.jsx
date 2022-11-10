import React, { useState, useEffect, useContext } from 'react';
import { EllipsisVerticalIcon, HeartIcon, PaperAirplaneIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode'
import { AppContext, UserContext } from '../../AppContext';
import './homeMain.css';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'

function HomeMain() {
    const Navigate = useNavigate()
    const { userData, setUserData } = useContext(UserContext);
    const { setShowEditPostModal } = useContext(AppContext);

    const [homePost, setHomePost] = useState([])

    const allPost = () => {
        axios.get('http://localhost:5000/home', {
            headers: {
                "x-access-token": localStorage.getItem("userToken"),
            },
        }).then((response) => {
            let user = jwtDecode(localStorage.getItem("userToken"))
            setUserData({
                id: user.user.split(' ')[0],
                name: user.user.split(' ')[1]
            })
            setHomePost(response.data)
        })
    }
    useEffect(() => {
        allPost()
    }, [Navigate]);

    const likeAndDisLike = (userId, postId, likedUser) => {
        let data = {
            userId, postId, likedUser
        }
        console.log(data);
        axios.put(`http://localhost:5000/likeordislike`, data, {
            headers: {
                "x-access-token": localStorage.getItem("userToken")
            },
        }).then((response) => {
            allPost()
        })
    }
    const userNavigation = [
        { name: 'Edit', icon: <PencilIcon className='w-5 h-5 inline-block mr-3' /> },
        { name: 'Delete', icon: <TrashIcon className='w-5 h-5 inline-block mr-3' /> },
    ]
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }


    return (
        //   bg - [#314f5f6e]
        <div>
            <div className='pb-[50px] sm:pb-0'>
                {
                    homePost.flatMap((iteam, index) => {
                        return (
                            <div className='bg-[#314f5f6e] p-[15px] mb-3 rounded-[10px] ' key={index}>
                                <div className='flex gap-3 items-center'>
                                    <div className='w-[50px] h-[50px]  overflow-hidden relative'>
                                        <img className='rounded-full' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                    </div>
                                    <div>
                                        <h4 className='leading-3 overflow-hidden pr-5 overflow-ellipsis whitespace-nowrap text-white inline-block max-w-[250px]'>{iteam.user[0]}</h4>  <small className='leading-3 overflow-hidden max-w-[250px] overflow-ellipsis whitespace-nowrap text-[#596C7A] inline-block'>@alex_mcCarthy</small>
                                        <small className='overflow-hidden overflow-ellipsis whitespace-nowrap text-[#596C7A] block'>{iteam.created}</small>
                                    </div>
                                    <div className='ml-auto'>

                                        {/* Profile dropdown */}
                                        <Menu as="div" className="relative ml-3">
                                            <div>
                                                <Menu.Button className="flex max-w-xs items-center ">
                                                    <span className="sr-only">Open user menu</span>
                                                    <EllipsisVerticalIcon className='h-6 w-6' />
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 z-10 mt-2 w-[120px] origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    {userNavigation.map((item) => (
                                                        <Menu.Item key={item.name}>
                                                            {({ active }) => (

                                                                <a className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
                                                                )} onClick={() => setShowEditPostModal(true)}
                                                                >
                                                                    {item.icon}{item.name}
                                                                </a>
                                                            )}
                                                        </Menu.Item>
                                                    ))}
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                </div>
                                <div className='w-full mt-3 rounded-[10px] overflow-hidden h-[400px]  border-4 border-solid border-[#314F5F] '>
                                    <img className='w-full rounded-[10px]' src={`/images/${iteam.image}`} alt="" />
                                </div>
                                <div className='pt-2 text-[14px]' style={{ 'display': '-webkit-box', '-webkit-line-clamp': '2', '-webkit-box-orient': 'vertical', 'overflow': 'hidden' }}>
                                    {iteam.description}
                                </div>
                                <a href="#" className='text-[#246EE9] underline'>ReadMore</a>
                                <div className='flex gap-3 items-center text-center pt-3'>
                                    <div onClick={() => {
                                        likeAndDisLike(iteam.mainId, iteam._id, userData.id)

                                    }} className=' cursor-pointer px-4 min-w-[70px] py-3 bg-[#314f5f6e] rounded-[5px] flex justify-center items-center gap-2 md:px-8'><HeartIcon className={`w-6 h-6 ${iteam.Likes.includes(userData.id) ? 'text-red-600' : 'text-white'}`} /> <span className='text-[16px]'>{iteam.Likes.length}</span></div>
                                    <div className=' px-4 min-w-[70px] py-3 bg-[#314f5f6e] rounded-[5px] flex justify-center items-center gap-2 md:px-8'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                                        </svg>

                                        <span className='text-[16px] hidden md:block'>Comment</span></div>
                                    <div className=' px-4 min-w-[70px] py-3 bg-[#314f5f6e] rounded-[5px] flex justify-center items-center gap-2 md:px-8'><PaperAirplaneIcon className='w-6 h-6 rotate-[-45deg]' /> <span className='text-[16px] hidden md:block'>Share</span></div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default HomeMain
