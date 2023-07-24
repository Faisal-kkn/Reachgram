import React, { useContext } from 'react'
import { AppContext } from '../../AppContext'

import { postUpdate } from '../../Api/UserApi/UserRequest'

function PostEdit() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const { postEdit, setPostEdit } = useContext(AppContext);

    const updatePost = async (e) => {
        e.preventDefault()
        try {
            const { data } = await postUpdate(postEdit)
            setPostEdit({
                ...postEdit,
                status: false
            })
        } catch (error) {
            console.log(error, 'catch error');
        }
    }

    const handleDataChange = (e) => {
        const { name, value } = e.target
        setPostEdit({
            ...postEdit,
            [name]: value
        })
    }

  return (
      <>
          
          {postEdit.status ? (
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
                                      onClick={() => setPostEdit({ ...postEdit, status : false})}
                                  >
                                      <span className="bg-transparent text-black h-6 w-6 text-2xl outline-none flex items-center justify-end pr-1 focus:outline-none">
                                          ×
                                      </span>
                                  </button>
                                  <form >
                                      <div className=''>
                                          <div className='flex gap-3 items-start'>
                                              <div className='w-[50px] h-[50px]  overflow-hidden relative'>
                                                  <img className='rounded-full' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                              </div>
                                              <div className='w-full'>
                                                  <h4 className='leading-3 overflow-hidden pr-5 overflow-ellipsis whitespace-nowrap text-[#0F213E] font-bold inline-block max-w-[500px]'>Alex McCarthy</h4>
                                                  <textarea name="description" className='block w-full text-[13px] border p-2 text-black' placeholder='Write a caption...' onChange={handleDataChange} value={postEdit.description}></textarea>
                                              </div>
                                          </div>
                                          <div className='w-full overflow-hidden h-[300px] flex justify-center items-center relative mt-3 border-4 border-solid border-[#314f5f65]'>
                                              <div id="bgimage" className='w-[80vw] md:w-[60vw] bg-cover  overflow-hidden h-[300px] flex justify-center items-center blur-[1px]' style={{ backgroundImage: `url(${PF + postEdit.image})`}}></div>
                                          </div>
                                      </div>
                                      <div className="flex items-center justify-center pt-[1px] border-t border-solid border-slate-200 rounded-b">
                                          <button className="w-full bg-[#246EE9] rounded-b-[10px] text-white active:bg-[#2d5695] font-bold uppercase text-sm py-3 shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150" onClick={updatePost}> Update </button>
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
      </>
  )
}

export default PostEdit
