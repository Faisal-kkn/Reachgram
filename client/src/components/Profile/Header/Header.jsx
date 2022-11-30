import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode'
import { AppContext, UserContext } from '../../../AppContext';
function Header({ data, handleSubmit, editbutton }) {
    const Navigate = useNavigate()
    const { editProfile, setEditProfile, setEditProfileErr } = useContext(AppContext);

    const [userDetails, setUserDetails] = useState([])
    const [friendsList, setFriendsList] = useState({data: [], status:false})
    const ProfileData = () => {
        console.log('sdfsd');
        let userDetail = jwtDecode(localStorage.getItem("userToken"))
        axios.get(`http://localhost:5000/profiledata?userId=${userDetail.user.split(' ')[0]}`, {
            headers: {
                "x-access-token": localStorage.getItem("userToken"),
            }
        })
        .then((response) => {
            console.log('asdadsa');
            setUserDetails(response.data[0])
        })
    }

    const submitProfile = () => {
        const formData = new FormData();
        for (let key in editProfile) {
            formData.append(key, editProfile[key])
        }
        axios.put('http://localhost:5000/editProfile', formData, {
            headers: {
                "x-access-token": localStorage.getItem("userToken"),
            }
        }).then((response) => {
            if (response.data.status == false){
                setEditProfileErr({ username: response.data.username, email: response.data.email, msg: response.data.msg })
            } else{
                ProfileData()
                setEditProfile({ status: false, phone: userDetails.phone, email: userDetails.email, about: userDetails.about, profile: userDetails.profile, fullname: userDetails.fullname, username: userDetails.username })
                setEditProfile({ ...editProfile, status: false })
            }
        })
    }

    const userFollowersList = (Followers)=>{
        console.log(Followers);
        let FollowersList = JSON.stringify(Followers) 
        axios.get('http://localhost:5000/FollowersList?FollowersList[]=' + FollowersList, {
            headers: {
                "x-access-token": localStorage.getItem("userToken"),
            }
        }).then((response)=>{
            setFriendsList({data: response.data, status: !friendsList.status})
        })
    }

    const userFollowingList = (Followers) => {
        console.log(Followers);
        let FollowersList = JSON.stringify(Followers)
        axios.get('http://localhost:5000/FollowersList?FollowersList[]=' + FollowersList, {
            headers: {
                "x-access-token": localStorage.getItem("userToken"),
            }
        }).then((response) => {
            setFriendsList({ data: response.data, status: !friendsList.status })
        })
    }

    useEffect(() => {
        ProfileData()
    }, [Navigate]);


    return (
        <>
            {friendsList.status ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl py-3">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#314F5F] outline-none focus:outline-none">
                                {/*body*/}
                                <div className="relative p-3 pb-2 pt-4 flex-auto">
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none absolute right-0 top-0"
                                        onClick={() => setFriendsList({ ...friendsList, status: false })}
                                    >
                                        <span className="bg-transparent text-white h-6 w-6 text-2xl outline-none flex items-center justify-end pr-1 focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                    <div className=' w-[300px] max-h-[200px]'>
                                        <ul>
                                            {
                                                friendsList.data.map((item, index)=>{
                                                    return(
                                                        <Link className=' ' key={index} to='/UserProfile' state={{ user: item }}>
                                                            <li>
                                                                <div className='my-2 flex gap-3 items-center' >
                                                                    <div className='w-[50px] h-[50px]  overflow-hidden relative rounded-full'>
                                                                        <img className='rounded-full' src={item.profile ? '/images/' + item.profile : `https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740&t=st=1669703755~exp=1669704355~hmac=e3cfbee8016a046173a54320da5c08b71fa822fe07e3107865ff80c66ab06c8f`} alt="" />
                                                                    </div>
                                                                    <div>
                                                                        <h4 className='leading-3 overflow-hidden w-[150px] overflow-ellipsis whitespace-nowrap text-white'>{item.fullname}</h4>
                                                                        <small className='overflow-hidden w-[150px] overflow-ellipsis whitespace-nowrap text-[#596C7A]'>@{item.username}</small>
                                                                    </div>
                                                                    <div>
                                                                        {/* <div className=' px-4 min-w-[70px] py-3 border-[2px] hover:bg-[#314f5f6e] transition-all rounded-[5px] flex justify-center items-center gap-2 md:px-8 cursor-pointer' onClick={() => followAction(userData.id)}>{(userDetails.friends && userDetails.friends.length != 0) && (userDetails.friends[0].followers.includes(userData.id) && userDetails.friends[0].following.includes(userData.id) ? 'UnFollow' : userDetails.friends[0].following.includes(userData.id) ? 'Follow Back' : userDetails.friends[0].followers.includes(userData.id) ? 'UnFollow' : 'Follow')}</div> */}
                                                                        {/* <div className=' px-4 min-w-[70px] py-2 border-[2px] hover:bg-[#314f5f6e] transition-all rounded-[5px] flex justify-center items-center gap-2 md:px-3 cursor-pointer' >follow</div> */}

                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </Link>
                                                        
                                                    )
                                                })
                                            }
                                           
                                        </ul>
                                    </div>
                                </div>
                                {/*footer*/}

                            </div>
                        </div>
                    </div>
                    <div className="fixed inset-0 z-40 bg-[#0f213eed]"></div>
                </>
            ) : null}
            <div className='mx-auto max-w-7xl flex justify-between flex-col md:flex-row  gap-3 w-12/12 bg-[#314f5f6e] rounded-[10px] p-[15px] text-white items-center'>
                <div className='flex gap-5 items-center w-full lg:w-4/12'>
                    <div className='border-[3px] rounded-[10px] min-w-[100px] h-[100px] bg-cover' style={{ backgroundImage: `url(${userDetails.profile ? '/images/' + userDetails.profile : 'https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740&t=st=1669703755~exp=1669704355~hmac=e3cfbee8016a046173a54320da5c08b71fa822fe07e3107865ff80c66ab06c8f'})` }}></div>
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
                    <div className='text-center' onClick={userDetails.friends && userDetails.friends.length != 0 ? () => userFollowersList(userDetails.friends[0].followers) : ''}>
                        {/* <p>{userDetails.friends[0]?.followers.length}</p> */}
                        {userDetails.friends && userDetails.friends.length != 0 ? userDetails.friends[0].followers.length : '0'}
                        <p>Followers</p>
                    </div>
                    <div className='text-center' onClick={userDetails.friends && userDetails.friends.length != 0 ? () => userFollowingList(userDetails.friends[0].following) : ''}>
                        {/* <p>{userDetails.friends[0]?.following.length}</p> */}
                        {userDetails.friends && userDetails.friends.length != 0 ? userDetails.friends[0].following.length : '0'}
                        <p>Following</p>
                    </div>
                </div>
                {editProfile.status ?

                    editbutton ? <div className='w-full sm:w-auto px-4 min-w-[70px] py-3 border-[2px] hover:bg-[#314f5f6e] transition-all rounded-[5px] flex justify-center items-center gap-2 md:px-8 cursor-pointer' onClick={() => setEditProfile({ ...editProfile, status: false })}> cancel</div> : <div className='w-full sm:w-auto px-4 min-w-[70px] py-3 border-[2px] hover:bg-[#314f5f6e] transition-all rounded-[5px] flex justify-center items-center gap-2 md:px-8 cursor-pointer' onClick={handleSubmit(submitProfile)}> Save</div>
                    : <div className=' w-full sm:w-auto px-4 min-w-[70px] py-3 border-[2px] hover:bg-[#314f5f6e] transition-all rounded-[5px] flex justify-center items-center gap-2 md:px-8 cursor-pointer' onClick={() => setEditProfile({ status: true, phone: userDetails.phone, email: userDetails.email, about: userDetails.about, profile: userDetails.profile, fullname: userDetails.fullname, username: userDetails.username })}> Edit Profile</div>}
            </div>
        </>
    )
}

export default Header
