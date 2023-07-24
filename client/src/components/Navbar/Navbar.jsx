import React, { useContext, useState, useEffect } from 'react'
import { Fragment } from 'react'
import { NavLink, useNavigate, Navigate, Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode'
import { AppContext, UserContext } from '../../AppContext';
import axios from 'axios';

import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, HomeIcon } from '@heroicons/react/24/solid'

import { getUserData, getSearch } from '../../Api/UserApi/UserRequest'

function Navbar({ socketio }) {
    const [notificationsData, setNotificationsData] = useState([])
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    useEffect(() => {
        socketio?.on("getNotification", data=>{
            setNotificationsData((prev)=>[...prev, data])
        })
    }, [socketio]);

    const displayNotifications = ({ senderName, type})=>{
        let action;
        let cmnt;

        if (type === 1){
            action = "liked";
            cmnt = "post";
        }else if(type === 2){
            action = "commented";
            cmnt = "post";
        }else{
            cmnt = "comment";
            action = "liked";
        }

        return(
            <span className='notification'>{`${senderName} ${action} your ${cmnt}`}</span>
        )
    }

    const { userData, setUserData } = useContext(UserContext);
    const { showPostModal, setShowPostModal } = useContext(AppContext);

    const Navigate = useNavigate()

    const [searchData, setSearchData] = useState({ search: '' })
    const [showNotifications, setShowNotifications] = useState(false)
    const [users, setUsers] = useState([])

    const newPost = (e) => {
        setShowPostModal(!showPostModal)
    }

    const notifications = (e)=>{
        setShowNotifications(!showNotifications)
    }

    const searchUser = async (searchData)=>{
        try {
            setSearchData({ search: searchData })
            const { data } = await getSearch(searchData)
            setUsers(data)

        } catch (error) {
            console.log(error, 'catch error');
        }
    }

    const logout = () => {
        localStorage.removeItem('userToken');
        Navigate("/login");
    };

    const user = {
        name: 'Tom Cook',
        email: 'tom@example.com',
        imageUrl:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    }
    const navigation = [
        { name: <HomeIcon className="w-6 h-6" aria-hidden="true" />, href: './', current: true },
        {
            name: <Link to='/chat' className="w-6 h-6" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
            </Link>, href: '#', current: false
        },
        {
            name: <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
                </svg>
            </span>, href: '#', current: false, fun: newPost
        },
        { name: <span className='relative'><BellIcon className="w-6 h-6 " aria-hidden="true" />{notificationsData.length != 0 && <span className='absolute top-[10px] left-[14px] rounded w-[9px] h-[9px] bg-red-500'>&nbsp;</span>}</span>, hrefs: 'notification', current: false, fun: notifications },
    ]
    const userNavigation = [
        { name: 'Your Profile', href: '/profile' },
        { name: 'Settings' },
        { name: 'Log out', fun: logout },
    ]
    function classNames(...classes) { return classes.filter(Boolean).join(' ') }

    const userDetails = async () => {
        try {
            let userDetails = jwtDecode(localStorage.getItem("userToken"))
            const { data } = await getUserData(userDetails.user.split(' ')[0])
            setUserData({
                image: data.profile,
                id: userDetails.user.split(' ')[0],
                name: data.fullname
            })
        } catch (error) {
            console.log(error, 'catch error');
        }
    }

    useEffect(() => {
        userDetails()
    }, [Navigate]);


    return (
        <div>
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-[#ffffff05]">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-7xl px-4 sm:px-3 lg:px-2">
                                <div className="flex h-16 items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 flex items-center gap-4">
                                            <img className="h-10" src="Rlogo_white.png" alt="Your Company" />
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
                                                    <input type="text" placeholder="Search" name='search' onChange={(e) =>{ searchUser(e.target.value)}} className="w-full py-2 pl-12 pr-4  text-gray-500 rounded-[5px] outline-none bg-[#314e5e6e] focus:bg-[#314F5F] focus:border-indigo-600" />
                                                    {users.length != 0 && searchData.search != '' ? 
                                                    <div className='absolute w-full bg-white z-50 rounded-[10px] mt-1'>
                                                        <div className='w-full max-h-[300px] overflow-y-scroll scrollbar-hide-comment border-[10px] border-[#fff] rounded-[10px]'>
                                                            {users.map((iteam, index)=>{
                                                                return(
                                                                    <div className='py-1 hover:bg-[#00000014]' key={index}>
                                                                        <Link className=' ' key={index} to={iteam._id == userData.id ? '/profile' : '/UserProfile'} state={{ user: iteam }} onClick={() => {
                                                                            setSearchData({ search: '' })
                                                                            searchUser('')
                                                                        }}>
                                                                            <div className='flex gap-3 items-center cursor-pointer'>
                                                                                <div className='w-[50px] h-[50px] overflow-hidden my-auto'>
                                                                                    <img className='rounded-full w-[50px] h-[50px] ' src={`${iteam.profile ? PF +  + iteam.profile : "https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"}`} alt="" />
                                                                                </div>
                                                                                <div className='w-[80%]'>
                                                                                    <h4 className='leading-3 overflow-hidden overflow-ellipsis whitespace-nowrap text-[#0F213E] capitalize  max-w-[150px]'>{iteam.fullname}</h4>
                                                                                    <small className='leading-1 overflow-hidden max-w-[250px] overflow-ellipsis whitespace-nowrap text-[#596C7A]'>{iteam.username}</small>
                                                                                </div>
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                )
                                                            })}                                                          
                                                        </div>
                                                    </div> : '' }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden sm:block ">
                                        <div className='flex'>
                                            <div className="hidden sm:block">
                                                <div className="ml-10 flex items-baseline space-x-4">
                                                    {navigation.map((item, index) => (
                                                        <div
                                                            key={index}
                                                            // href={item.href}
                                                            className={classNames(
                                                                item.current
                                                                    ? 'bg-gray-900 text-white'
                                                                    : 'text-[#A0ADB4] hover:bg-gray-700 hover:text-white',
                                                                'px-3 py-2 rounded-md text-sm font-medium cursor-pointer'
                                                            )}
                                                            onClick={item.fun}
                                                            aria-current={item.current ? 'page' : undefined}
                                                        >
                                                            <NavLink to={item.href}> {item.name}</NavLink>
                                                            {(notificationsData.length != 0 && item.hrefs == 'notification' && showNotifications) &&
                                                                <div className='absolute w-[200px] text-gray-700 bg-white  z-50 rounded-[10px] mt-1'>
                                                                    <div className='w-[200px] max-h-[300px] overflow-y-scroll  scrollbar-hide-comment border-[10px] border-[#fff] rounded-[10px] flex flex-col gap-2'>
                                                                        {notificationsData.map((iteam, index) => displayNotifications(iteam))}
                                                                    </div>
                                                                </div>}
                                                        </div>
                                                    ))}
                                                    
                                                </div>
                                            </div>
                                            <div className="ml-4 flex items-center md:ml-6">
                                                <button type="button" className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none ring-gray focus:ring-2  focus:ring-gray focus:ring-offset-2 focus:ring-offset-gray-800" >
                                                    <span className="sr-only">View notifications</span>
                                                    
                                                </button>

                                                {/* Profile dropdown */}
                                                <Menu as="div" className="relative ml-3">
                                                    <div>
                                                        <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none ring-2 ring-gray ring-offset-2 ring-offset-gray-800 ring-gray focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                            <span className="sr-only">Open user menu</span>
                                                            <img className="h-8 w-8 rounded-full" src={userData?.image ? PF + userData?.image : 'https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740&t=st=1669703755~exp=1669704355~hmac=e3cfbee8016a046173a54320da5c08b71fa822fe07e3107865ff80c66ab06c8f'} alt="" />
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
                                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                            {userNavigation.map((item, index) => (
                                                                <Menu.Item key={index}>
                                                                    {({ active }) => (
                                                                        item.fun ? <div className={classNames(
                                                                            active ? 'bg-gray-100' : '',
                                                                            'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
                                                                        )} onClick={item.fun}>{item.name}</div> : <NavLink
                                                                            to={item.href}
                                                                            className={classNames(
                                                                                active ? 'bg-gray-100' : '',
                                                                                'block px-4 py-2 text-sm text-gray-700 '
                                                                            )}
                                                                        >
                                                                            {item.name}
                                                                        </NavLink>
                                                                    )}
                                                                </Menu.Item>
                                                            ))}
                                                        </Menu.Items>
                                                    </Transition>
                                                </Menu>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex sm:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="sm:hidden">
                                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                                    {navigation.map((item, index) => (
                                        <Navigate to={item.href}> <Disclosure.Button
                                            key={index}
                                            as="a"
                                            href={item.href}
                                            className={classNames(
                                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'block px-3 py-2 rounded-md text-base font-medium'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </Disclosure.Button></Navigate>
                                    ))}
                                </div>
                                <div className="border-t border-gray-700 pt-4 pb-3">
                                    <div className="flex items-center px-5">
                                        <div className="flex-shrink-0">
                                            <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-base font-medium leading-none text-white">{user.name}</div>
                                            <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                                        </div>
                                        <button
                                            type="button"
                                            className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                        >
                                            <span className="sr-only">View notifications</span>
                                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                    <div className="mt-3 space-y-1 px-2">
                                        {userNavigation.map((item, index) => (
                                            <Disclosure.Button
                                                key={index}
                                                as="a"
                                                href={item.href}
                                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                            >
                                                {item.name}
                                            </Disclosure.Button>
                                        ))}
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>


            </div>
        </div>
    )
}

export default Navbar
