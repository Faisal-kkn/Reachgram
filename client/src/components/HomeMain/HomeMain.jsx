import React from 'react';
import { EllipsisVerticalIcon, HeartIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';
import './homeMain.css';

function HomeMain() {
    return (
        //   bg - [#314f5f6e]
        <div>
            <div className='pb-[50px] sm:pb-0'>
                <div className='bg-[#314f5f6e] p-[15px] mb-3 rounded-[10px] '>
                    <div className='flex gap-3 items-center'>
                        <div className='w-[50px] h-[50px]  overflow-hidden relative'>
                            <img className='rounded-full' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                            <span className='w-[15px] h-[15px] bg-green-500 absolute bottom-[2px] right-0 rounded-full'></span>
                        </div>
                        <div>
                            <h4 className='leading-3 overflow-hidden pr-5 overflow-ellipsis whitespace-nowrap text-white inline-block max-w-[250px]'>Alex McCarthy</h4>  <small className='leading-3 overflow-hidden max-w-[250px] overflow-ellipsis whitespace-nowrap text-[#596C7A] inline-block'>@alex_mcCarthy</small>
                            <small className='overflow-hidden overflow-ellipsis whitespace-nowrap text-[#596C7A] block'>2 hours ago</small>
                        </div>
                        <div className='ml-auto'>
                            <EllipsisVerticalIcon className='h-6 w-6' />
                        </div>
                    </div>
                    <div className='w-full mt-3 rounded-[10px] overflow-hidden h-[400px]  border-4 border-solid border-[#314F5F] '>
                        <img className='w-full rounded-[10px]' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                    </div>
                    <div className='post-cnt pt-2 text-[14px]'>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur eos quisquam minima, assumenda vel nostrum odit quis modi eum autem est nobis neque obcaecati animi eius possimus iusto dolor fugit.
                    </div>
                    <a href="#" className='text-[#246EE9] underline'>ReadMore</a>
                    <div className='flex gap-3 items-center text-center pt-3'>
                        <div className=' px-4 min-w-[70px] py-3 bg-[#314f5f6e] rounded-[5px] flex justify-center items-center gap-2 md:px-8'><HeartIcon className='w-6 h-6 ' /> <span className='text-[16px]'>2</span></div>
                        <div className=' px-4 min-w-[70px] py-3 bg-[#314f5f6e] rounded-[5px] flex justify-center items-center gap-2 md:px-8'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                            </svg>

                            <span className='text-[16px] hidden md:block'>Comment</span></div>
                        <div className=' px-4 min-w-[70px] py-3 bg-[#314f5f6e] rounded-[5px] flex justify-center items-center gap-2 md:px-8'><PaperAirplaneIcon className='w-6 h-6 rotate-[-45deg]' /> <span className='text-[16px] hidden md:block'>Share</span></div>
                    </div>
                </div>
                <div className='bg-[#314f5f6e] p-[15px] mb-3 rounded-[10px] '>
                    <div className='flex gap-3 items-center'>
                        <div className='w-[50px] h-[50px]  overflow-hidden relative'>
                            <img className='rounded-full' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                            <span className='w-[15px] h-[15px] bg-green-500 absolute bottom-[2px] right-0 rounded-full'></span>
                        </div>
                        <div>
                            <h4 className='leading-3 overflow-hidden pr-5 overflow-ellipsis whitespace-nowrap text-white inline-block max-w-[250px]'>Alex McCarthy</h4>  <small className='leading-3 overflow-hidden max-w-[250px] overflow-ellipsis whitespace-nowrap text-[#596C7A] inline-block'>@alex_mcCarthy</small>
                            <small className='overflow-hidden overflow-ellipsis whitespace-nowrap text-[#596C7A] block'>2 hours ago</small>
                        </div>
                        <div className='ml-auto'>
                            <EllipsisVerticalIcon className='h-6 w-6' />
                        </div>
                    </div>
                    <div className='w-full mt-3 rounded-[10px] overflow-hidden h-[400px]  border-4 border-solid border-[#314F5F] '>
                        <img className='w-full rounded-[10px]' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                    </div>
                    <div className='post-cnt pt-2 text-[14px]'>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur eos quisquam minima, assumenda vel nostrum odit quis modi eum autem est nobis neque obcaecati animi eius possimus iusto dolor fugit.
                    </div>
                    <a href="#" className='text-[#246EE9] underline'>ReadMore</a>
                    <div className='flex gap-3 items-center text-center pt-3'>
                        <div className=' px-4 min-w-[70px] py-3 bg-[#314f5f6e] rounded-[5px] flex justify-center items-center gap-2 md:px-8'><HeartIcon className='w-6 h-6 ' /> <span className='text-[16px]'>2</span></div>
                        <div className=' px-4 min-w-[70px] py-3 bg-[#314f5f6e] rounded-[5px] flex justify-center items-center gap-2 md:px-8'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                            </svg>

                            <span className='text-[16px] hidden md:block'>Comment</span></div>
                        <div className=' px-4 min-w-[70px] py-3 bg-[#314f5f6e] rounded-[5px] flex justify-center items-center gap-2 md:px-8'><PaperAirplaneIcon className='w-6 h-6 rotate-[-45deg]' /> <span className='text-[16px] hidden md:block'>Share</span></div>
                    </div>
                </div>
                <div className='bg-[#314f5f6e] p-[15px] mb-3 rounded-[10px] '>
                    <div className='flex gap-3 items-center'>
                        <div className='w-[50px] h-[50px]  overflow-hidden relative'>
                            <img className='rounded-full' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                            <span className='w-[15px] h-[15px] bg-green-500 absolute bottom-[2px] right-0 rounded-full'></span>
                        </div>
                        <div>
                            <h4 className='leading-3 overflow-hidden pr-5 overflow-ellipsis whitespace-nowrap text-white inline-block max-w-[250px]'>Alex McCarthy</h4>  <small className='leading-3 overflow-hidden max-w-[250px] overflow-ellipsis whitespace-nowrap text-[#596C7A] inline-block'>@alex_mcCarthy</small>
                            <small className='overflow-hidden overflow-ellipsis whitespace-nowrap text-[#596C7A] block'>2 hours ago</small>
                        </div>
                        <div className='ml-auto'>
                            <EllipsisVerticalIcon className='h-6 w-6' />
                        </div>
                    </div>
                    <div className='w-full mt-3 rounded-[10px] overflow-hidden h-[400px]  border-4 border-solid border-[#314F5F] '>
                        <img className='w-full rounded-[10px]' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                    </div>
                    <div className='post-cnt pt-2 text-[14px]'>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur eos quisquam minima, assumenda vel nostrum odit quis modi eum autem est nobis neque obcaecati animi eius possimus iusto dolor fugit.
                    </div>
                    <a href="#" className='text-[#246EE9] underline'>ReadMore</a>
                    <div className='flex gap-3 items-center text-center pt-3'>
                        <div className=' px-4 min-w-[70px] py-3 bg-[#314f5f6e] rounded-[5px] flex justify-center items-center gap-2 md:px-8'><HeartIcon className='w-6 h-6 ' /> <span className='text-[16px]'>2</span></div>
                        <div className=' px-4 min-w-[70px] py-3 bg-[#314f5f6e] rounded-[5px] flex justify-center items-center gap-2 md:px-8'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                            </svg>

                            <span className='text-[16px] hidden md:block'>Comment</span></div>
                        <div className=' px-4 min-w-[70px] py-3 bg-[#314f5f6e] rounded-[5px] flex justify-center items-center gap-2 md:px-8'><PaperAirplaneIcon className='w-6 h-6 rotate-[-45deg]' /> <span className='text-[16px] hidden md:block'>Share</span></div>
                    </div>
                </div>
                <div className='bg-[#314f5f6e] p-[15px] mb-3 rounded-[10px] '>
                    <div className='flex gap-3 items-center'>
                        <div className='w-[50px] h-[50px]  overflow-hidden relative'>
                            <img className='rounded-full' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                            <span className='w-[15px] h-[15px] bg-green-500 absolute bottom-[2px] right-0 rounded-full'></span>
                        </div>
                        <div>
                            <h4 className='leading-3 overflow-hidden pr-5 overflow-ellipsis whitespace-nowrap text-white inline-block max-w-[250px]'>Alex McCarthy</h4>  <small className='leading-3 overflow-hidden max-w-[250px] overflow-ellipsis whitespace-nowrap text-[#596C7A] inline-block'>@alex_mcCarthy</small>
                            <small className='overflow-hidden overflow-ellipsis whitespace-nowrap text-[#596C7A] block'>2 hours ago</small>
                        </div>
                        <div className='ml-auto'>
                            <EllipsisVerticalIcon className='h-6 w-6' />
                        </div>
                    </div>
                    <div className='w-full mt-3 rounded-[10px] overflow-hidden h-[400px]  border-4 border-solid border-[#314F5F] '>
                        <img className='w-full rounded-[10px]' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                    </div>
                    <div className='post-cnt pt-2 text-[14px]'>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur eos quisquam minima, assumenda vel nostrum odit quis modi eum autem est nobis neque obcaecati animi eius possimus iusto dolor fugit.
                    </div>
                    <a href="#" className='text-[#246EE9] underline'>ReadMore</a>
                    <div className='flex gap-3 items-center text-center pt-3'>
                        <div className=' px-4 min-w-[70px] py-3 bg-[#314f5f6e] rounded-[5px] flex justify-center items-center gap-2 md:px-8'><HeartIcon className='w-6 h-6 ' /> <span className='text-[16px]'>2</span></div>
                        <div className=' px-4 min-w-[70px] py-3 bg-[#314f5f6e] rounded-[5px] flex justify-center items-center gap-2 md:px-8'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                            </svg>

                            <span className='text-[16px] hidden md:block'>Comment</span></div>
                        <div className=' px-4 min-w-[70px] py-3 bg-[#314f5f6e] rounded-[5px] flex justify-center items-center gap-2 md:px-8'><PaperAirplaneIcon className='w-6 h-6 rotate-[-45deg]' /> <span className='text-[16px] hidden md:block'>Share</span></div>
                    </div>
                </div>
                <div className='bg-[#314f5f6e] p-[15px] mb-3 rounded-[10px] '>
                    <div className='flex gap-3 items-center'>
                        <div className='w-[50px] h-[50px]  overflow-hidden relative'>
                            <img className='rounded-full' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                            <span className='w-[15px] h-[15px] bg-green-500 absolute bottom-[2px] right-0 rounded-full'></span>
                        </div>
                        <div>
                            <h4 className='leading-3 overflow-hidden pr-5 overflow-ellipsis whitespace-nowrap text-white inline-block max-w-[250px]'>Alex McCarthy</h4>  <small className='leading-3 overflow-hidden max-w-[250px] overflow-ellipsis whitespace-nowrap text-[#596C7A] inline-block'>@alex_mcCarthy</small>
                            <small className='overflow-hidden overflow-ellipsis whitespace-nowrap text-[#596C7A] block'>2 hours ago</small>
                        </div>
                        <div className='ml-auto'>
                            <EllipsisVerticalIcon className='h-6 w-6' />
                        </div>
                    </div>
                    <div className='w-full mt-3 rounded-[10px] overflow-hidden h-[400px]  border-4 border-solid border-[#314F5F] '>
                        <img className='w-full rounded-[10px]' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                    </div>
                    <div className='post-cnt pt-2 text-[14px]'>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur eos quisquam minima, assumenda vel nostrum odit quis modi eum autem est nobis neque obcaecati animi eius possimus iusto dolor fugit.
                    </div>
                    <a href="#" className='text-[#246EE9] underline'>ReadMore</a>
                    <div className='flex gap-3 items-center text-center pt-3'>
                        <div className=' px-4 min-w-[70px] py-3 bg-[#314f5f6e] rounded-[5px] flex justify-center items-center gap-2 md:px-8'><HeartIcon className='w-6 h-6 ' /> <span className='text-[16px]'>2</span></div>
                        <div className=' px-4 min-w-[70px] py-3 bg-[#314f5f6e] rounded-[5px] flex justify-center items-center gap-2 md:px-8'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                            </svg>

                            <span className='text-[16px] hidden md:block'>Comment</span></div>
                        <div className=' px-4 min-w-[70px] py-3 bg-[#314f5f6e] rounded-[5px] flex justify-center items-center gap-2 md:px-8'><PaperAirplaneIcon className='w-6 h-6 rotate-[-45deg]' /> <span className='text-[16px] hidden md:block'>Share</span></div>
                    </div>
                </div>
                <div className='bg-[#314f5f6e] p-[15px] mb-3 rounded-[10px] '>
                    <div className='flex gap-3 items-center'>
                        <div className='w-[50px] h-[50px]  overflow-hidden relative'>
                            <img className='rounded-full' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                            <span className='w-[15px] h-[15px] bg-green-500 absolute bottom-[2px] right-0 rounded-full'></span>
                        </div>
                        <div>
                            <h4 className='leading-3 overflow-hidden pr-5 overflow-ellipsis whitespace-nowrap text-white inline-block max-w-[250px]'>Alex McCarthy</h4>  <small className='leading-3 overflow-hidden max-w-[250px] overflow-ellipsis whitespace-nowrap text-[#596C7A] inline-block'>@alex_mcCarthy</small>
                            <small className='overflow-hidden overflow-ellipsis whitespace-nowrap text-[#596C7A] block'>2 hours ago</small>
                        </div>
                        <div className='ml-auto'>
                            <EllipsisVerticalIcon className='h-6 w-6' />
                        </div>
                    </div>
                    <div className='w-full mt-3 rounded-[10px] overflow-hidden h-[400px]  border-4 border-solid border-[#314F5F] '>
                        <img className='w-full rounded-[10px]' src="https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                    </div>
                    <div className='post-cnt pt-2 text-[14px]'>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur eos quisquam minima, assumenda vel nostrum odit quis modi eum autem est nobis neque obcaecati animi eius possimus iusto dolor fugit.
                    </div>
                    <a href="#" className='text-[#246EE9] underline'>ReadMore</a>
                    <div className='flex gap-3 items-center text-center pt-3'>
                        <div className=' px-4 min-w-[70px] py-3 bg-[#314f5f6e] rounded-[5px] flex justify-center items-center gap-2 md:px-8'><HeartIcon className='w-6 h-6 ' /> <span className='text-[16px]'>2</span></div>
                        <div className=' px-4 min-w-[70px] py-3 bg-[#314f5f6e] rounded-[5px] flex justify-center items-center gap-2 md:px-8'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                            </svg>

                            <span className='text-[16px] hidden md:block'>Comment</span></div>
                        <div className=' px-4 min-w-[70px] py-3 bg-[#314f5f6e] rounded-[5px] flex justify-center items-center gap-2 md:px-8'><PaperAirplaneIcon className='w-6 h-6 rotate-[-45deg]' /> <span className='text-[16px] hidden md:block'>Share</span></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeMain
