import React, { useContext, useState } from 'react'
import { AppContext } from '../../AppContext';

function PostUpload() {
    const { showPostModal, setShowPostModal } = useContext(AppContext);

    const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
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
                                    <form className="" name="">
                                        <div className=''>
                                            <div className='flex gap-3 items-start'>
                                                <div className='w-[50px] h-[50px]  overflow-hidden relative'>
                                                    <img className='rounded-full' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                                </div>
                                                <div className='w-full'>
                                                    <h4 className='leading-3 overflow-hidden pr-5 overflow-ellipsis whitespace-nowrap text-[#0F213E] font-bold inline-block max-w-[500px]'>Alex McCarthy</h4>
                                                    <textarea className='block w-full text-[13px] border p-2' placeholder='Write a caption...'></textarea>
                                                </div>
                                            </div>
                                            <div className='w-full overflow-hidden h-[300px] flex justify-center items-center relative mt-3 border-4 border-solid border-[#314f5f65]'>
                                                <div id="bgimage" className='w-[80vw] md:w-[60vw] bg-cover  overflow-hidden h-[300px] flex justify-center items-center blur-[1px]' style={{ backgroundImage: `url(${file || 'https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80' })`}}></div>
                                                <input type="file" name="" id="imgInp" className='w-[100px] absolute text-transparent custom-file-input' onChange={handleChange} />
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
