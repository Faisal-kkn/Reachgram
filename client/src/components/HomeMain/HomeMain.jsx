import React, { useState, useEffect, useContext } from 'react';
import { EllipsisVerticalIcon, HeartIcon, PaperAirplaneIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode'
import { AppContext, UserContext } from '../../AppContext';
import './homeMain.css';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import PostEditModal from '../PostEdit/PostEdit';
import { format, render, cancel, register } from 'timeago.js';

function HomeMain() {
    const Navigate = useNavigate()
    const { userData, setUserData } = useContext(UserContext);
    const { postEdit, setPostEdit } = useContext(AppContext);

    const [homePost, setHomePost] = useState([])
    const [comment, setComment] = useState({ id: '', status: false })
    const [commentData, setCommentData] = useState('')
    const [allComments, setAllComments] = useState([])

    const allPost = () => {
        axios.get('http://localhost:5000/home', {
            headers: {
                "x-access-token": localStorage.getItem("userToken"),
            },
        }).then((response) => {
            if (response.data.auth === false) {
                Navigate("/login");
            } else {
                let user = jwtDecode(localStorage.getItem("userToken"))
                setUserData({
                    ...userData,
                    id: user.user.split(' ')[0],
                    name: user.user.split(' ')[1]
                })
                console.log('response.dataaaaaaa');
                console.log(response.data);
                setHomePost(response.data)
            }

        })
    }

    const editPost = (userId, mainId, postId, description, image) => {
        setPostEdit({ description: description, image: image, status: true, userId, mainId, postId, })
    }

    const deletePost = (userId, mainId, postId) => {
        axios.delete(`http://localhost:5000/deletePost?mainId=${mainId}&postId=${postId}`, {
            headers: {
                "x-access-token": localStorage.getItem("userToken"),
            }
        }).then(() => {
            allPost()
        })
        console.log('delete post');
    }

    const likeAndDisLike = (userId, postId, likedUser) => {
        let data = {
            userId, postId, likedUser
        }
        axios.put(`http://localhost:5000/likeordislike`, data, {
            headers: {
                "x-access-token": localStorage.getItem("userToken")
            },
        }).then((response) => {
            allPost()
        })
    }

    const allCommentData = (postId, status) => {
        console.log(postId);
        console.log('status');
        console.log(status);
        if (!status) {
            axios.get(`http://localhost:5000/postComments?postId=${postId}`, {
                headers: {
                    "x-access-token": localStorage.getItem("userToken"),
                }
            }).then((response)=>{
                console.log('rrrrrresponse');
                console.log(response);
                setAllComments(response.data)
            })
        }
        
    }

    const postComment = (postId, userId) => {
        axios.post('http://localhost:5000/commentPost', { userId: userId, postId: postId, comment: commentData }, {
            headers: {
                "x-access-token": localStorage.getItem("userToken"),
            }
        }).then(()=>{
            allCommentData(postId ,false)
            setCommentData('')
        })

    }

    const commentLikeAndDisLike = (postId, commentId, likedUser)=>{
        axios.put(`http://localhost:5000/commentLikeAndDisLike`, { postId, commentId, likedUser }, {
            headers: {
                "x-access-token": localStorage.getItem("userToken")
            },
        }).then(() => {
            allCommentData(postId, false)
        })

    }

    const userNavigation = [
        {
            name: 'Edit', icon: <PencilIcon className='w-5 h-5 inline-block mr-3' />, fun: function () {
                editPost(this.userId, this.mainId, this.postId, this.description, this.image)
            }
        },
        {
            name: 'Delete', icon: <TrashIcon className='w-5 h-5 inline-block mr-3' />, fun: function () {
                deletePost(this.userId, this.mainId, this.postId, this.index)
            }
        },
    ]

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    useEffect(() => {
        allPost()
    }, [Navigate, postEdit]);

    return (
        <div>
            <PostEditModal />
            <div className='pb-[50px] sm:pb-0'>
                {
                    homePost.flatMap((iteam, index) => {
                        return (
                            <div className='bg-[#314f5f6e] p-[15px] mb-3 rounded-[10px] ' key={index}>
                                <div className='flex gap-3 items-center'>
                                    <div className='w-[50px] h-[50px]  overflow-hidden relative'>
                                        <img className='rounded-full' src={`${'/images/' + iteam.profile || "https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"}`} alt="" />
                                    </div>
                                    <div>
                                        <h4 className='leading-3 overflow-hidden pr-5 overflow-ellipsis whitespace-nowrap text-white inline-block max-w-[250px]'>{iteam.user[0]}</h4>  <small className='leading-3 overflow-hidden max-w-[250px] overflow-ellipsis whitespace-nowrap text-[#596C7A] inline-block'>@{iteam.username[0]}</small>
                                        <small className='overflow-hidden overflow-ellipsis whitespace-nowrap text-[#596C7A] block'>{format(iteam.created)}</small>
                                    </div>
                                    <div className='ml-auto'>

                                        {iteam.userId[0] === userData.id ? <Menu as="div" className="relative ml-3">
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
                                                    {userNavigation.map((item, index) => (
                                                        <Menu.Item key={index}>
                                                            {({ active }) => (

                                                                <a key={item.name} className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
                                                                )} onClick={() => item.fun.call({ userId: userData.id, mainId: iteam.mainId, postId: iteam._id, description: iteam.description, image: iteam.image })}>
                                                                    {item.icon}{item.name}
                                                                </a>
                                                            )}
                                                        </Menu.Item>
                                                    ))}
                                                </Menu.Items>
                                            </Transition>
                                        </Menu> : ''}
                                    </div>
                                </div>
                                <div className='w-full mt-3 rounded-[10px] overflow-hidden h-[400px]  border-4 border-solid border-[#314F5F] '>
                                    <img className='w-full rounded-[10px]' src={`/images/${iteam.image}`} alt="" />
                                </div>
                                <div className='pt-2 text-[14px] post-cnt' > {/*  style={{ 'display': '-webkit-box', '-webkit-line-clamp': '2', '-webkit-box-orient': 'vertical', 'overflow': 'hidden' }} */}
                                    {iteam.description}
                                </div>
                                <a href="#" className='text-[#246EE9] underline'>ReadMore</a>
                                <div className='flex gap-3 items-center text-center pt-3'>
                                    <div onClick={() => { likeAndDisLike(iteam.mainId, iteam._id, userData.id) }} className=' cursor-pointer px-4 min-w-[70px] py-3 bg-[#314f5f6e] rounded-[5px] flex justify-center items-center gap-2 md:px-8'><HeartIcon className={`w-6 h-6 ${iteam.Likes.includes(userData.id) ? 'text-red-600' : 'text-white'}`} /> <span className='text-[16px]'>{iteam.Likes.length == 0 ? '' : iteam.Likes.length}</span></div>
                                    <div onClick={() =>{ allCommentData(iteam._id, comment.status)
                                        setComment({ id: iteam._id, status: !comment.status }) }} className={` transition ease-in-out delay-150 cursor-pointer px-4 min-w-[70px] py-3   rounded-[5px] flex justify-center items-center gap-2 md:px-8 ${comment.status && comment.id == iteam._id ? 'bg-white text-black font-semibold' : 'bg-[#314f5f6e]'}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                                        </svg>
                                        <span className='text-[16px] hidden md:block'>Comment</span>
                                    </div>
                                    <div className=' px-4 min-w-[70px] py-3 bg-[#314f5f6e] rounded-[5px] flex justify-center items-center gap-2 md:px-8'><PaperAirplaneIcon className='w-6 h-6 rotate-[-45deg]' /> <span className='text-[16px] hidden md:block'>Share</span></div>
                                </div>
                                {comment.status && comment.id == iteam._id ?
                                    <>
                                        <div className={`mt-4 transition ease-in-out delay-150 max-h-[300px] ${allComments.length > 3 ? 'overflow-y-scroll scrollbar-hide-comment' : ''}`}>
                                            {allComments.map((comment)=>{
                                                return(
                                                    <div className='flex gap-3 items-start pb-3'>
                                                        <div className='w-[50px] h-[50px] rounded-full overflow-hidden relative'>
                                                            <img className='rounded-full' src={`${'/images/' + comment.user.profile || 'https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'}`} alt="" />
                                                        </div>
                                                        <div className='w-[85%]'>
                                                            <h4 className='leading-3 overflow-hidden pr-5 overflow-ellipsis whitespace-nowrap text-white inline-block max-w-[250px]'>{comment.user.fullname}</h4>  <small className='leading-3 overflow-hidden max-w-[250px] overflow-ellipsis whitespace-nowrap text-[#596C7A] inline-block'>@{comment.user.username}</small> 
                                                            <div className='text-[14px]'>{comment.comments.comment}</div>
                                                            <span className='text-[13px] text-[#596C7A]'>{comment.comments.Likes.length} Likes</span>
                                                            <small className='leading-3 overflow-hidden max-w-[250px] overflow-ellipsis whitespace-nowrap text-[#596C7A] inline-block'>&nbsp; &nbsp; &nbsp; &nbsp; {format(comment.comments.created)}</small>
                                                        </div>
                                                        <div className='ml-auto'>
                                                            <HeartIcon onClick={() => { commentLikeAndDisLike(iteam._id, comment.comments._id, userData.id) }} className={`w-5 h-5 cursor-pointer ${comment.comments.Likes.includes(userData.id) ? 'text-red-600' : 'text-white'}`} />
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <div className='pt-4 pb-1'>
                                            <div className='flex items-center h-[50px] border-[#314F5F] border-[2px] bg-[#05141c2b] rounded-l-3xl rounded-[10px]'>

                                                <div className='w-[70px] h-[70px] rounded-full overflow-hidden relative left-[-10px]'>
                                                    <img className='rounded-full' src={`${'/images/'+userData.image || "https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"}`} alt="" />
                                                </div>
                                                <div className='w-[90%] h-full'>
                                                    <input type="text" value={commentData} onChange={(e) => setCommentData(e.target.value)} className='w-full border-transparent bg-transparent outline-none h-full' />
                                                </div>
                                                <div className='ml-auto  px-2'>
                                                    <button className='text-[#F5F5F5]' onClick={() => postComment(iteam._id, userData.id)}>Post</button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    : ''}
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default HomeMain
