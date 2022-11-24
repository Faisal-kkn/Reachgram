import React from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import './chat.css'

function Chat() {
    return (
        <>
            <div className='mx-auto max-w-7xl px-1 sm:px-3 lg:px-2 flex justify-between gap-3 w-12/12 pt-1 md:pt-3'>
                <div className='hidden lg:block w-3/12 bg-[#314f5f6e] rounded-[10px] p-[15px] text-white'>
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
                            <input type="text" placeholder="Search" name='search' className="w-full py-2 pl-12 pr-4  text-gray-500 rounded-[5px] outline-none bg-[#314e5e6e] focus:bg-[#314F5F] focus:border-indigo-600" />
                            
                        </div>
                        <div className='mt-3 flex flex-col gap-3 overflow-y-scroll h-[85vh] lg:h-[77vh] md:h-[85vh] sm:h-[90vh] scrollbar-hide'>
                            <div className='flex gap-3 items-center bg-white p-3 rounded-[10px]' >
                                <div className='w-[50px] h-[50px]  overflow-hidden relative'>
                                    <img className='rounded-full' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                    <span className='w-[15px] h-[15px] bg-green-500 absolute bottom-[2px] right-0 rounded-full'></span>
                                </div>
                                <div >
                                    <h4 className='leading-4 overflow-hidden pr-5 overflow-ellipsis whitespace-nowrap text-[#0F213E] font-bold max-w-[250px]'>Alex McCarthy</h4>
                                    <small className='leading-3 overflow-hidden max-w-[250px] overflow-ellipsis whitespace-nowrap text-[#596C7A]'>@alex_mc_carthy</small>
                                </div>
                            </div>
                            <div className='flex gap-3 items-center bg-[#314f5f6e]  p-3 rounded-[10px]' >
                                <div className='w-[50px] h-[50px]  overflow-hidden relative'>
                                    <img className='rounded-full' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                    <span className='w-[15px] h-[15px] bg-green-500 absolute bottom-[2px] right-0 rounded-full'></span>
                                </div>
                                <div >
                                    <h4 className='leading-4 overflow-hidden pr-5 overflow-ellipsis whitespace-nowrap text-white max-w-[250px]'>Alex McCarthy</h4>
                                    <small className='leading-3 overflow-hidden max-w-[250px] overflow-ellipsis whitespace-nowrap text-[#596C7A]'>@alex_mc_carthy</small>
                                </div>
                            </div>
                            <div className='flex gap-3 items-center bg-[#314f5f6e]  p-3 rounded-[10px]' >
                                <div className='w-[50px] h-[50px]  overflow-hidden relative'>
                                    <img className='rounded-full' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                    <span className='w-[15px] h-[15px] bg-green-500 absolute bottom-[2px] right-0 rounded-full'></span>
                                </div>
                                <div >
                                    <h4 className='leading-4 overflow-hidden pr-5 overflow-ellipsis whitespace-nowrap text-white max-w-[250px]'>Alex McCarthy</h4>
                                    <small className='leading-3 overflow-hidden max-w-[250px] overflow-ellipsis whitespace-nowrap text-[#596C7A]'>@alex_mc_carthy</small>
                                </div>
                            </div>
                            <div className='flex gap-3 items-center bg-[#314f5f6e]  p-3 rounded-[10px]' >
                                <div className='w-[50px] h-[50px]  overflow-hidden relative'>
                                    <img className='rounded-full' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                    <span className='w-[15px] h-[15px] bg-green-500 absolute bottom-[2px] right-0 rounded-full'></span>
                                </div>
                                <div >
                                    <h4 className='leading-4 overflow-hidden pr-5 overflow-ellipsis whitespace-nowrap text-white max-w-[250px]'>Alex McCarthy</h4>
                                    <small className='leading-3 overflow-hidden max-w-[250px] overflow-ellipsis whitespace-nowrap text-[#596C7A]'>@alex_mc_carthy</small>
                                </div>
                            </div>
                            <div className='flex gap-3 items-center bg-[#314f5f6e]  p-3 rounded-[10px]' >
                                <div className='w-[50px] h-[50px]  overflow-hidden relative'>
                                    <img className='rounded-full' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                    <span className='w-[15px] h-[15px] bg-green-500 absolute bottom-[2px] right-0 rounded-full'></span>
                                </div>
                                <div >
                                    <h4 className='leading-4 overflow-hidden pr-5 overflow-ellipsis whitespace-nowrap text-white max-w-[250px]'>Alex McCarthy</h4>
                                    <small className='leading-3 overflow-hidden max-w-[250px] overflow-ellipsis whitespace-nowrap text-[#596C7A]'>@alex_mc_carthy</small>
                                </div>
                            </div>
                            <div className='flex gap-3 items-center bg-[#314f5f6e]  p-3 rounded-[10px]' >
                                <div className='w-[50px] h-[50px]  overflow-hidden relative'>
                                    <img className='rounded-full' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                    <span className='w-[15px] h-[15px] bg-green-500 absolute bottom-[2px] right-0 rounded-full'></span>
                                </div>
                                <div >
                                    <h4 className='leading-4 overflow-hidden pr-5 overflow-ellipsis whitespace-nowrap text-white max-w-[250px]'>Alex McCarthy</h4>
                                    <small className='leading-3 overflow-hidden max-w-[250px] overflow-ellipsis whitespace-nowrap text-[#596C7A]'>@alex_mc_carthy</small>
                                </div>
                            </div>
                            <div className='flex gap-3 items-center bg-[#314f5f6e]  p-3 rounded-[10px]' >
                                <div className='w-[50px] h-[50px]  overflow-hidden relative'>
                                    <img className='rounded-full' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                    <span className='w-[15px] h-[15px] bg-green-500 absolute bottom-[2px] right-0 rounded-full'></span>
                                </div>
                                <div >
                                    <h4 className='leading-3 overflow-hidden pr-5 overflow-ellipsis whitespace-nowrap text-white max-w-[250px]'>Alex McCarthy</h4>
                                    <small className='leading-3 overflow-hidden max-w-[250px] overflow-ellipsis whitespace-nowrap text-[#596C7A]'>@alex_mc_carthy</small>
                                </div>
                            </div>
                            <div className='flex gap-3 items-center bg-[#314f5f6e]  p-3 rounded-[10px]' >
                                <div className='w-[50px] h-[50px]  overflow-hidden relative'>
                                    <img className='rounded-full' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                    <span className='w-[15px] h-[15px] bg-green-500 absolute bottom-[2px] right-0 rounded-full'></span>
                                </div>
                                <div >
                                    <h4 className='leading-3 overflow-hidden pr-5 overflow-ellipsis whitespace-nowrap text-white max-w-[250px]'>Alex McCarthy</h4>
                                    <small className='leading-3 overflow-hidden max-w-[250px] overflow-ellipsis whitespace-nowrap text-[#596C7A]'>@alex_mc_carthy</small>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className='lg:w-9/12 md:w-7/12 block text-white'>
                    {/* <div className='mb-1 md:mb-3 '>
                        <div>
                            <div className='h-full bg-[#314f5f6e] pb-1 pt-[10px] px-2 rounded-[10px] flex overflow-x-scroll w-screen md:w-full scrollbar-hide gap-2 '>

                                <div className='rounded text-center w-[75px]'>
                                    <div className='relative'>
                                        <PlusIcon className='absolute top-[25%] left-[25%] w-10 h-10 z-20 mx-auto text-white opacity-70' />
                                        <img className="p-[2px] border-[3px] w-full rounded-full mx-auto blur-[2px]" src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                    </div>
                                    <div className='overflow-hidden w-[75px] overflow-ellipsis whitespace-nowrap h-[20px] leading-5 text-[#596C7A]'><small>Add Your Story</small></div>
                                </div>
                                <div className='rounded text-center w-[75px]'>
                                    <img className="p-[2px] border-[3px] w-full rounded-full mx-auto" src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                    <div className='overflow-hidden w-[75px] overflow-ellipsis whitespace-nowrap h-[20px] leading-5 text-[#596C7A]'><small>@czxcxzcxzcxzxczcxssssssssssssssssssssssssss</small></div>
                                </div>
                                <div className='rounded text-center w-[75px]'>
                                    <img className="p-[2px] border-[3px] w-full rounded-full mx-auto" src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                    <div className='overflow-hidden w-[75px] overflow-ellipsis whitespace-nowrap h-[20px] leading-5 text-[#596C7A]'><small>@czxcxzcxzcxzxczcxssssssssssssssssssssssssss</small></div>
                                </div>
                                <div className='rounded text-center w-[75px]'>
                                    <img className="p-[2px] border-[3px] w-full rounded-full mx-auto" src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                    <div className='overflow-hidden w-[75px] overflow-ellipsis whitespace-nowrap h-[20px] leading-5 text-[#596C7A]'><small>@czxcxzcxzcxzxczcxssssssssssssssssssssssssss</small></div>
                                </div>
                                <div className='rounded text-center w-[75px]'>
                                    <img className="p-[2px] border-[3px] w-full rounded-full mx-auto" src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                    <div className='overflow-hidden w-[75px] overflow-ellipsis whitespace-nowrap h-[20px] leading-5 text-[#596C7A]'><small>@czxcxzcxzcxzxczcxssssssssssssssssssssssssss</small></div>
                                </div>
                                <div className='rounded text-center w-[75px]'>
                                    <img className="p-[2px] border-[3px] w-full rounded-full mx-auto" src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                    <div className='overflow-hidden w-[75px] overflow-ellipsis whitespace-nowrap h-[20px] leading-5 text-[#596C7A]'><small>@czxcxzcxzcxzxczcxssssssssssssssssssssssssss</small></div>
                                </div>
                                <div className='rounded text-center w-[75px]'>
                                    <img className="p-[2px] border-[3px] w-full rounded-full mx-auto" src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                    <div className='overflow-hidden w-[75px] overflow-ellipsis whitespace-nowrap h-[20px] leading-5 text-[#596C7A]'><small>@czxcxzcxzcxzxczcxssssssssssssssssssssssssss</small></div>
                                </div>

                                <div className='rounded text-center w-[75px]'>
                                    <img className="p-[2px] border-[3px] w-full rounded-full mx-auto" src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                    <div className='overflow-hidden w-[75px] overflow-ellipsis whitespace-nowrap h-[20px] leading-5 text-[#596C7A]'><small>@czxcxzcxzcxzxczcxssssssssssssssssssssssssss</small></div>
                                </div>
                                <div className='rounded text-center w-[75px]'>
                                    <img className="p-[2px] border-[3px] w-full rounded-full mx-auto" src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                    <div className='overflow-hidden w-[75px] overflow-ellipsis whitespace-nowrap h-[20px] leading-5 text-[#596C7A]'><small>@czxcxzcxzcxzxczcxssssssssssssssssssssssssss</small></div>
                                </div>
                                <div className='rounded text-center w-[75px]'>
                                    <img className="p-[2px] border-[3px] w-full rounded-full mx-auto" src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                    <div className='overflow-hidden w-[75px] overflow-ellipsis whitespace-nowrap h-[20px] leading-5 text-[#596C7A]'><small>@czxcxzcxzcxzxczcxssssssssssssssssssssssssss</small></div>
                                </div>
                                <div className='rounded text-center w-[75px]'>
                                    <img className="p-[2px] border-[3px] w-full rounded-full mx-auto" src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                    <div className='overflow-hidden w-[75px] overflow-ellipsis whitespace-nowrap h-[20px] leading-5 text-[#596C7A]'><small>@czxcxzcxzcxzxczcxssssssssssssssssssssssssss</small></div>
                                </div>
                                <div className='rounded text-center w-[75px]'>
                                    <img className="p-[2px] border-[3px] w-full rounded-full mx-auto" src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                    <div className='overflow-hidden w-[75px] overflow-ellipsis whitespace-nowrap h-[20px] leading-5 text-[#596C7A]'><small>@czxcxzcxzcxzxczcxssssssssssssssssssssssssss</small></div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className='h-[85vh] lg:h-[88vh] md:h-[85vh] sm:h-[90vh] p-[15px] bg-[#314f5f6e] text-white rounded-[10px]'>
                        <div>
                            <div className='flex gap-3 items-center'>
                                <div className='w-[50px] h-[50px]  overflow-hidden relative'>
                                    <img className='rounded-full' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                    <span className='w-[15px] h-[15px] bg-green-500 absolute bottom-[2px] right-0 rounded-full'></span>
                                </div>
                                <div >
                                    <div className='flex items-center'>
                                        <h4 className='leading-3 overflow-hidden pr-5 overflow-ellipsis whitespace-nowrap text-white inline-block max-w-[250px]'>Alex McCarthy</h4>
                                        {/* <small className='leading-3 overflow-hidden max-w-[250px] overflow-ellipsis whitespace-nowrap text-[#596C7A] inline-block'>@alex_mc_carthy</small> */}
                                    </div>
                                    <small className='mt-[5px] overflow-hidden overflow-ellipsis whitespace-nowrap text-[#596C7A] block'>Online</small>
                                </div>
                            </div>
                            <div className='overflow-y-scroll h-[85vh] lg:h-[68vh] md:h-[85vh] sm:h-[90vh] p-[15px] text-black scrollbar-hide'>
                                <div>
                                    <div className='mb-2'>
                                        <div className='relative'>
                                            <div className='trapezoid inline-block'></div>
                                            <p className=' bg-white w-fit p-1 pl-[5px] px-3 inline-block absolute top-0 left-[15px] rounded-[5px]'>fdjka</p>
                                        </div>
                                        <p className='text-[#868686] text-[11px] mt-[3px]'>Today, 5:05 pm</p>
                                    </div>
                                    <div className='mb-2'>
                                        <div className='relative'>
                                            <div className='trapezoid inline-block'></div>
                                            <p className=' bg-white w-fit p-1 pl-[5px] px-3 inline-block absolute top-0 left-[15px] rounded-[5px]'>fdjka</p>
                                        </div>
                                        <p className='text-[#868686] text-[11px] mt-[3px]'>Today, 5:05 pm</p>
                                    </div>
                                    <div className='mb-2'>
                                        <div className='relative'>
                                            <div className='trapezoid inline-block'></div>
                                            <p className=' bg-white w-fit p-1 pl-[5px] px-3 inline-block absolute top-0 left-[15px] rounded-[5px]'>fdjka</p>
                                        </div>
                                        <p className='text-[#868686] text-[11px] mt-[3px]'>Today, 5:05 pm</p>
                                    </div>
                                    <div className='mb-2'>
                                        <div className='relative'>
                                            <div className='trapezoid inline-block trapezoid-right'></div>
                                            <p className=' bg-white w-fit p-1 pr-[5px] px-3 inline-block absolute top-0 right-[14px] rounded-[5px] '>fdjka</p>
                                        </div>
                                        <p className='text-[#868686] text-right  text-[11px] mt-[3px]'>Today, 5:05 pm</p>
                                    </div>
                                    <div className='mb-2'>
                                        <div className='relative'>
                                            <div className='trapezoid inline-block trapezoid-right'></div>
                                            <p className=' bg-white w-fit p-1 pr-[5px] px-3 inline-block absolute top-0 right-[14px] rounded-[5px] '>fdjka</p>
                                        </div>
                                        <p className='text-[#868686] text-right  text-[11px] mt-[3px]'>Today, 5:05 pm</p>
                                    </div>
                                    <div className='mb-2'>
                                        <div className='relative'>
                                            <div className='trapezoid inline-block trapezoid-right'></div>
                                            <p className=' bg-white w-fit p-1 pr-[5px] px-3 inline-block absolute top-0 right-[14px] rounded-[5px] '>fdjka</p>
                                        </div>
                                        <p className='text-[#868686] text-right  text-[11px] mt-[3px]'>Today, 5:05 pm</p>
                                    </div>
                                    <div className='mb-2'>
                                        <div className='relative'>
                                            <div className='trapezoid inline-block'></div>
                                            <p className=' bg-white w-fit p-1 pl-[5px] px-3 inline-block absolute top-0 left-[15px] rounded-[5px]'>fdjka</p>
                                        </div>
                                        <p className='text-[#868686] text-[11px] mt-[3px]'>Today, 5:05 pm</p>
                                    </div>
                                </div>
                            </div>
                            <div className='pt-4 pb-1'>
                                <div className='flex items-center h-[50px] border-[#314F5F] border-[2px] bg-[#05141c2b] rounded-[10px] px-[10px]'>
                                    <div className='w-[95%] h-full'>
                                        <input type="text" className='w-full border-transparent bg-transparent outline-none h-full' />
                                    </div>
                                    <div className='ml-auto  px-2'>
                                        <PaperAirplaneIcon className='w-6 h-6 ' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat
