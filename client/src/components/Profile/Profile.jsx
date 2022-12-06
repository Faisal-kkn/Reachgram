import React, { useState, useEffect, useContext, Fragment } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode'
import { AppContext, UserContext } from '../../AppContext';
import { EllipsisVerticalIcon, HeartIcon, PaperAirplaneIcon, PencilIcon, TrashIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import ProfilHead from './Header/Header'
import './profile.css'
import { useForm } from "react-hook-form";
import { format } from 'timeago.js';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ToastContainer, toast } from 'react-toastify';
import PostEditModal from '../PostEdit/PostEdit';

function Profile() {
    const Navigate = useNavigate()

    const notify = () => toast.success('Post Deleted !', {
        position: toast.POSITION.TOP_RIGHT
    });

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const { userData, setUserData } = useContext(UserContext);
    const { editProfile, setEditProfile, editProfileErr, postEdit, setPostEdit } = useContext(AppContext);

    const [profilePosts, setProfilePosts] = useState([])
    const [editProfileBtn, setEditProfileBtn] = useState(true)
    const [singlePostShow, setsinglePostShow] = useState(false)
    const [profilePostsId, setProfilePostsId] = useState({
        postMainId: ''
    })
    const [comment, setComment] = useState({ id: '', status: false })
    const [commentData, setCommentData] = useState('')
    const [allComments, setAllComments] = useState([])


    const myPosts = async () => {
        let userDetails = jwtDecode(localStorage.getItem("userToken"))

        await axios.get(`http://localhost:5000/profile?userId=${userDetails.user.split(' ')[0]}`, {
            headers: {
                "x-access-token": localStorage.getItem("userToken"),
            },
        }).then((response) => {
            if (response.data.auth === false) {
                Navigate("/login");
            } else {
                setProfilePosts(response.data.reverse())
                setProfilePostsId({ postMainId: response.data[0].mainId })
                console.log('response.data[0]');
                console.log(response.data[0]);
            }
        })

    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setEditProfileBtn(false)
        setEditProfile({
            ...editProfile,
            [name]: value,
            userId: userData.id
        })
    }

    const profileChange = (e) => {
        setEditProfile({ ...editProfile, profile: e.target.files[0], userId: userData.id })
        setEditProfileBtn(false)
    }
    useEffect(() => {
        myPosts()
    }, [Navigate]);

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
            myPosts()
        })
    }

    const allCommentData = (postId, status) => {
        if (!status) {
            axios.get(`http://localhost:5000/postComments?postId=${postId}`, {
                headers: {
                    "x-access-token": localStorage.getItem("userToken"),
                }
            }).then((response) => {
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
        }).then(() => {
            allCommentData(postId, false)
            setCommentData('')
        })

    }

    const commentLikeAndDisLike = (postId, commentId, likedUser) => {
        axios.put(`http://localhost:5000/commentLikeAndDisLike`, { postId, commentId, likedUser }, {
            headers: {
                "x-access-token": localStorage.getItem("userToken")
            },
        }).then(() => {
            allCommentData(postId, false)
        })

    }
    const singlePost = (id) => {
        setsinglePostShow(true)

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


    const editPost = (userId, mainId, postId, description, image) => {
        setPostEdit({ description: description, image: image, status: true, userId, mainId, postId, })
    }

    const deletePost = (userId, mainId, postId) => {
        axios.delete(`http://localhost:5000/deletePost?mainId=${mainId}&postId=${postId}`, {
            headers: {
                "x-access-token": localStorage.getItem("userToken"),
            }
        }).then(() => {
            notify()
            myPosts()
        })
    }

    return (
        <div className='px-1 sm:px-3 lg:px-2 md:pt-3  pt-1'>
            <ToastContainer />
            <PostEditModal />

            <ProfilHead data={profilePosts.length} handleSubmit={handleSubmit} editbutton={editProfileBtn} />

            <div className='relative'>
                {
                    singlePostShow && <div className='cursor-pointer absolute rounded-sm top-[5px] left-[130px] p-2 z-30 bg-[#00000030]  text-white' onClick={() => {
                        setsinglePostShow(false)
                        Navigate('/profile')
                    }}>
                        <ArrowLeftIcon className='w-6 h-6' />
                    </div>
                }
                
                <div className={` mx-auto max-w-7xl gap-3 w-12/12 bg-[#314f5f6e] rounded-[10px] p-[15px] text-white mt-[15px] overflow-y-scroll scroll-smooth scrollbar-hide pb-[10px] ${editProfile.status ? 'h-auto' : ' h-[65vh] pb-5 md:h-[80vh] md:pb-0 lg:h-[70vh'}`}>
                    {editProfile.status ? <div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                            <div className='bg-[#182D39] px-3 rounded-[5px] h-fit pb-1 w-full'>
                                <label htmlFor='fullname' className='text-[13px]  text-[#596C7A]'>Full Name</label>
                                <input {...register('fullname', { required: true, minLength: 3 })} value={editProfile.fullname} onChange={handleChange} id='fullname' type="text" className='w-full h-[30px] bg-transparent text-white focus:outline-none' />
                                {errors.fullname && <p className='text-[13px] text-red-600'>Please check the First Name</p>}
                            </div>
                            <div className='bg-[#182D39] px-3 rounded-[5px] h-fit pb-1 w-full'>
                                <label htmlFor='username' className='text-[13px]  text-[#596C7A]'>User Name</label>
                                <input {...register('username', { required: true, pattern: /^@?(\w){1,15}$/ })} value={editProfile.username} onChange={handleChange} id='username' type="text" className='w-full h-[30px] bg-transparent text-white focus:outline-none' />
                                {errors.username && <p className='text-[13px] text-red-600'>Please check the User Name</p>}
                                {editProfileErr.username == false ? <p className='text-[13px] mb-2 text-red-600'>{editProfileErr.msg}</p> : ''}
                            </div>
                            <div className='bg-[#182D39] px-3 rounded-[5px] h-fit pb-1 w-full'>
                                <label htmlFor='email' className='text-[13px]  text-[#596C7A]'>Email</label>
                                <input {...register('email', {
                                    required: true,
                                    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                })} id='email' type="email" onChange={handleChange} className='w-full h-[30px] bg-transparent text-white focus:outline-none' value={editProfile.email} />
                                {errors.email && <p className='text-[13px] text-red-600'>Please check the Email</p>}
                                {editProfileErr.email == false ? <p className='text-[13px] mb-2 text-red-600'>{editProfileErr.msg}</p> : ''}

                            </div>
                            <div className='bg-[#182D39] px-3 rounded-[5px] h-fit pb-1 w-full'>
                                <label htmlFor='phone' className='text-[13px]  text-[#596C7A]'>Phone</label>
                                <input {...register('phone', { required: true, maxLength: 10, pattern: /^[0-9]{10}$/ })} value={editProfile.phone} onChange={handleChange} id='phone' type="tel" className='w-full h-[30px] bg-transparent text-white focus:outline-none' />
                                {errors.phone && <p className='text-[13px] text-red-600'>Please check the Phone Number</p>}
                            </div>
                            <div className='bg-[#182D39] px-3 rounded-[5px] h-fit pb-1 w-full'>
                                <label htmlFor='profile' className='text-[13px]  text-[#596C7A]'>Profile</label>
                                <input name='profile' id='profile' onChange={profileChange} type="file" className='w-full h-[30px] bg-transparent text-white focus:outline-none pb-[10px]' />
                            </div>
                            <div className='bg-[#182D39] px-3 rounded-[5px] h-fit pb-1 w-full'>
                                <label htmlFor='about' className='text-[13px]  text-[#596C7A]'>About</label>
                                <textarea name='about' value={editProfile.about} id='about' onChange={handleChange} className='w-full h-[30px] bg-transparent text-white focus:outline-none' rows="10" ></textarea>
                            </div>
                        </div>
                    </div>
                        : profilePosts.length === 0 ? <div className='w-full bg-[#f8f8fa]'><img className='mx-auto h-full' src="https://cdn.dribbble.com/users/1785628/screenshots/5605512/media/097297f8e21d501ba45d7ce437ed77bd.gif" alt="" /></div> :
                            <>

                                {
                                    !singlePostShow ? <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-5 items-center'>
                                        {profilePosts.reverse().map((iteam, index) => {
                                            return (
                                                <div key={index} className='rounded-[10px] bg-cover h-[300px] overflow-hidden relative hover-main'  >
                                                    <div className='border-[4px] rounded-[10px] bg-cover h-full w-full overflow-hidden absolute' style={{ borderImage: "linear-gradient(#83A2B4, #50809B) 30" }}></div>
                                                    <div className='rounded-[10px] overflow-hidden h-full w-full p-1' >
                                                        <img key={index} className='w-full h-full' src={`/images/${iteam.image}`} alt="" />
                                                    </div>
                                                    <div className='hover-data flex gap-5 justify-center items-center'>
                                                        <div key={index} onClick={() => likeAndDisLike(profilePostsId.postMainId, iteam._id, userData.id)} className=' cursor-pointer min-w-[70px] py-3 bg-[rgba(49,79,95,0.4)] rounded-[5px] flex justify-center items-center gap-2 md:px-8 h-fit'><HeartIcon className={`w-6 h-6 ${iteam.Likes.includes(userData.id) ? 'text-red-600' : 'text-white'} `} /> <span className='text-[16px]'>{iteam.Likes.length}</span></div>
                                                        <a href={'#cmnt' + iteam._id}>
                                                            <div onClick={() => {
                                                                allCommentData(iteam._id, comment.status)
                                                                setComment({ id: iteam._id, status: !comment.status })
                                                                setsinglePostShow(true)
                                                            }} className=' min-w-[70px] py-3 bg-[#314f5f6e] rounded-[5px] flex justify-center items-center gap-2 md:px-8 h-fit'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                                                                </svg>
                                                            </div>
                                                        </a>
                                                        <div className=' min-w-[70px] py-3 bg-[#314f5f6e] rounded-[5px] flex justify-center items-center gap-2 md:px-8 h-fit'><PaperAirplaneIcon className='w-6 h-6 rotate-[-45deg]' /></div>
                                                        <a className='absolute top-0 left-0 w-full h-full z-[-1] scroll-smooth' href={'#' + iteam._id} onClick={() => singlePost(iteam._id)}> </a>
                                                    </div>
                                                </div>
                                            )
                                        })}


                                    </div> :
                                        <>
                                            {
                                                profilePosts.reverse().map((iteam, index) => {
                                                    return (
                                                        <div className='max-w-3xl mx-auto' key={index} id={iteam._id}>
                                                            <div className='bg-[#314f5f6e] p-[15px] mb-3 rounded-[10px] '>
                                                                <div className='flex gap-3 items-center'>
                                                                    <div className='w-[50px] h-[50px]  overflow-hidden relative'>
                                                                        <img className='rounded-full' src={`${'/images/' + userData.image}`} alt="" />
                                                                    </div>
                                                                    <div>
                                                                        <h4 className='leading-3 overflow-hidden pr-5 overflow-ellipsis whitespace-nowrap text-white inline-block max-w-[250px]'>{userData.name}</h4>
                                                                        <small className='overflow-hidden overflow-ellipsis whitespace-nowrap text-[#596C7A] block'>{format(iteam.created)}</small>
                                                                    </div>
                                                                    <div className='ml-auto'>

                                                                        <Menu as="div" className="relative ml-3">
                                                                            <div>
                                                                                <Menu.Button className="flex max-w-xs items-center ">
                                                                                    <span className="sr-only">Open user menu</span>
                                                                                    <EllipsisVerticalIcon className='h-6 w-6' />
                                                                                </Menu.Button>
                                                                            </div>
                                                                            <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95" >
                                                                                <Menu.Items className="absolute right-0 z-10 mt-2 w-[120px] origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                                    {userNavigation.map((item, index) => (
                                                                                        <Menu.Item key={index}>
                                                                                            {({ active }) => (

                                                                                                <Link key={item.name} className={classNames(
                                                                                                    active ? 'bg-gray-100' : '',
                                                                                                    'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
                                                                                                )} onClick={() => item.fun.call({ userId: userData.id, mainId: iteam.mainId, postId: iteam._id, description: iteam.description, image: iteam.image })}>
                                                                                                    {item.icon}{item.name}
                                                                                                </Link>
                                                                                            )}
                                                                                        </Menu.Item>
                                                                                    ))}
                                                                                </Menu.Items>
                                                                            </Transition>
                                                                        </Menu>
                                                                    </div>
                                                                </div>
                                                                <div className='w-full mt-3 rounded-[10px] overflow-hidden h-auto md:h-[400px] border-4 border-solid border-[#314F5F] '>
                                                                    <img className='w-full rounded-[10px]' src={`/images/${iteam.image}`} alt="" />
                                                                </div>
                                                                <div className='pt-2 text-[14px] post-cnt' > {/*  style={{ 'display': '-webkit-box', '-webkit-line-clamp': '2', '-webkit-box-orient': 'vertical', 'overflow': 'hidden' }} */}
                                                                    {iteam.description}
                                                                </div>
                                                                <Link href="#" className='text-[#246EE9] underline'>ReadMore</Link>
                                                                <div className='flex gap-3 items-center text-center pt-3'>
                                                                    <div key={index} onClick={() => likeAndDisLike(profilePostsId.postMainId, iteam._id, userData.id)} className=' cursor-pointer px-4 min-w-[70px] py-3 bg-[#314f5f6e] rounded-[5px] flex justify-center items-center gap-2 md:px-8'><HeartIcon className={`w-6 h-6 ${iteam.Likes.includes(userData.id) ? 'text-red-600' : 'text-white'}`} /> <span className='text-[16px]'>{iteam.Likes.length == 0 ? '' : iteam.Likes.length}</span></div>
                                                                    <div onClick={() => {
                                                                        allCommentData(iteam._id, comment.status)
                                                                        setComment({ id: iteam._id, status: !comment.status })
                                                                    }} className={` transition ease-in-out delay-150 cursor-pointer px-4 min-w-[70px] py-3   rounded-[5px] flex justify-center items-center gap-2 md:px-8 ${comment.status && comment.id == iteam._id ? 'bg-white text-black font-semibold' : 'bg-[#314f5f6e]'}`}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                                                                        </svg>
                                                                        <span className='text-[16px] hidden md:block'>Comment</span>
                                                                    </div>
                                                                    <div className=' px-4 min-w-[70px] py-3 bg-[#314f5f6e] rounded-[5px] flex justify-center items-center gap-2 md:px-8'><PaperAirplaneIcon className='w-6 h-6 rotate-[-45deg]' /> <span className='text-[16px] hidden md:block'>Share</span></div>
                                                                </div>
                                                                {comment.status && comment.id == iteam._id ?
                                                                    <>
                                                                        <div id={'cmnt'+iteam._id} className={`mt-4 transition ease-in-out delay-150 max-h-[300px] ${allComments.length > 3 ? 'overflow-y-scroll scrollbar-hide-comment' : ''}`}>
                                                                            {allComments.map((comment) => {
                                                                                return (
                                                                                    <div className='flex gap-3 items-start pb-3' key={index}>
                                                                                        <div className='w-[50px] h-[50px] rounded-full overflow-hidden relative'>
                                                                                            <img className='rounded-full' src={comment.user?.profile ? '/images/' + comment.user.profile : 'https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740&t=st=1669703755~exp=1669704355~hmac=e3cfbee8016a046173a54320da5c08b71fa822fe07e3107865ff80c66ab06c8f'} alt="" />
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
                                                                                    <img className='rounded-full' src={comment.user?.profile ? '/images/' + comment.user.profile : 'https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740&t=st=1669703755~exp=1669704355~hmac=e3cfbee8016a046173a54320da5c08b71fa822fe07e3107865ff80c66ab06c8f'} alt="" />
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
                                                        </div>
                                                    )
                                                })
                                            }
                                        </>

                                }
                            </>
                    }
                </div>
            </div>

        </div>
    )
}

export default Profile
