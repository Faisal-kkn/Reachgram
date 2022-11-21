import React, { useContext, useState, useEffect } from 'react'
import { AppContext, UserContext } from '../../AppContext';
import axios from 'axios';
import jwtDecode from 'jwt-decode'

function PostUpload() {

    const { showPostModal, setShowPostModal } = useContext(AppContext);
    const { userData, setUserData } = useContext(UserContext);
    const [postData, setPostData] = useState({ discription: '', image: '', userId: '' })
    const [file, setFile] = useState();
    const fileUpload = (e) => {
        console.log(userData);
        console.log('e.target.files[0');
        console.log(e.target.files);
        let userDetails = jwtDecode(localStorage.getItem("userToken"))
        console.log(userDetails);
        setUserData({
            ...userData,
            id: userDetails.user.split(' ')[0]
        })
        setFile(URL.createObjectURL(e.target.files[0]))
        setPostData({
            ...postData,
            image: e.target.files[0],
            userId: userDetails.user.split(' ')[0]
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setPostData({
            ...postData,
            [name]: value,
            userId: userData.id
        })
    }

    const postUpload =async (e) => {
        e.preventDefault()
        
        const formData = new FormData();
        for(let key in postData) {
            formData.append(key, postData[key])
        }
        console.log(postData);
        console.log(formData);
        axios.post('http://localhost:5000/newPost', formData, {
            headers: {
                "x-access-token": localStorage.getItem("userToken"),
            }
        }).then(response => {
            console.log('responseeeeeeeeeeeeeeeeeeeeeeeee');
            console.log(response);
            setShowPostModal(false)
            // if (response.data) {
            //     setPostData({ discription: '', image: '' })
            // }
        }).catch(error => console.log(error))

    }

    return (
        <div>

            {showPostModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl py-3">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*body*/}
                                <div className="relative p-3 pb-2 flex-auto">
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none absolute right-0 top-0"
                                        onClick={() => setShowPostModal(false)}
                                    >
                                        <span className="bg-transparent text-black h-6 w-6 text-2xl outline-none flex items-center justify-end pr-1 focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                    <form onSubmit={postUpload}>
                                        <div className=''>
                                            <div className='flex gap-3 items-start'>
                                                <div className='w-[50px] h-[50px]  overflow-hidden relative'>
                                                    <img className='rounded-full' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                                </div>
                                                <div className='w-full'>
                                                    <h4 className='leading-3 overflow-hidden pr-5 overflow-ellipsis whitespace-nowrap text-[#0F213E] font-bold inline-block max-w-[500px]'>{userData.name}</h4>
                                                    <textarea value={postData.discription} name="discription" onChange={handleChange} className='block w-full text-[13px] border p-2' placeholder='Write a caption...'></textarea>
                                                </div>
                                            </div>
                                            <div className='w-full overflow-hidden h-[300px] flex justify-center items-center relative mt-3 border-4 border-solid border-[#314f5f65]'>
                                                <div id="bgimage" className='w-[80vw] md:w-[60vw] bg-cover  overflow-hidden h-[300px] flex justify-center items-center blur-[1px]' style={{ backgroundImage: `url(${file || 'https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'})` }}></div>
                                                <input name="image" onChange={fileUpload}  multiple type="file" id="imgInp" className='w-[100px] absolute text-transparent custom-file-input' />
                                            </div>

                                        </div>
                                        <div className="flex items-center justify-center pt-[1px] border-t border-solid border-slate-200 rounded-b">
                                            <button className="w-full bg-[#246EE9] rounded-b-[10px] text-white active:bg-[#2d5695] font-bold uppercase text-sm py-3 shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"> Upload </button>
                                        </div>
                                    </form>
                                </div>
                                {/*footer*/}

                            </div>
                        </div>
                    </div>
                    <div className="fixed inset-0 z-40 bg-[#0f213eed]"></div>
                </>
            ) : null}
        </div>
    )
}


export default PostUpload
