import React, { useContext, useState, Fragment } from 'react'
import './mobile.css'
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { AppContext, UserContext } from '../../../AppContext';
import axios from 'axios';

import { Menu, Transition } from '@headlessui/react'
import { BellIcon, HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'

import { getSearch } from '../../../Api/UserApi/UserRequest'

function Mobile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const { userData } = useContext(UserContext);
    const { showPostModal, setShowPostModal, showSingleChat, setShowSingleChat } = useContext(AppContext);
    const Navigate = useNavigate()
    const [searchData, setSearchData] = useState({ search: '' })
    const [showNotifications, setShowNotifications] = useState(false)
    const [users, setUsers] = useState([])

    const newPost = (e) => {
        setShowPostModal(!showPostModal)
    }

    const notifications = (e) => {
        console.log('notiiiiiiiiii');
        setShowNotifications(!showNotifications)
    }

    const chatSingle = ()=>{
        setShowSingleChat(false)
    }

    const searchUser = async (data) => {
        try {
            setSearchData({ search: data })
            const { data } = await getSearch(data)
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
        { name: <HomeIcon className="w-7 h-7" aria-hidden="true" />, href: './', current: true },
        { name: <MagnifyingGlassIcon className="w-7 h-7" aria-hidden="true" />, current: false },
        {
            name: <Link to='/chat' className="w-7 h-7" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-7 h-7">
                    <path d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
            </Link>, href: '#', current: false, fun: chatSingle
        },
        {
            name: <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
                </svg>
            </span>, href: '#', current: false, fun: newPost
        },
    ]
    const userNavigation = [
        { name: 'Your Profile', href: '/profile' },
        { name: 'Settings' },
        { name: 'Log out', fun: logout },
    ]
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div>
            <section id="bottom-navigation" className="block pt-2 sm:pt-0 fixed inset-x-0 bottom-0 z-10 bg-[#0f213ede]  shadow px-4 sm:px-3 lg:px-2 mobile-menu">
                <div id="tabs" className="flex justify-between items-center">
                    {navigation.map((item, index) => (
                        <div
                            key={index}
                            href={item.href}
                            className={classNames(
                                item.current
                                    ? ' text-white'
                                    : 'text-[#A0ADB4] hover:text-white',
                                'px-3 py-2 rounded-md text-sm font-medium'
                            )}
                            onClick={item.fun}
                            aria-current={item.current ? 'page' : undefined}
                        >
                            <NavLink to={item.href}> {item.name}</NavLink>
                        </div>
                    ))}

                    <div className="ml-4 flex items-center md:ml-6">
                        <button type="button" className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none ring-gray focus:ring-2  focus:ring-gray focus:ring-offset-2 focus:ring-offset-gray-800" >
                            <span className="sr-only">View notifications</span>

                        </button>

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                            <div>
                                <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none ring-2 ring-gray ring-offset-2 ring-offset-gray-800 ring-gray focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="sr-only">Open user menu</span>
                                    <img className="h-8 w-8 rounded-full" src={userData?.image ? PF +  userData?.image : 'https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740&t=st=1669703755~exp=1669704355~hmac=e3cfbee8016a046173a54320da5c08b71fa822fe07e3107865ff80c66ab06c8f'} alt="" />
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
                                <Menu.Items className="absolute right-0 top-[-130px] z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
            </section>
        </div>
    )
}

export default Mobile
