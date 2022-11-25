import React from 'react'
import { format } from 'timeago.js';

function Message({ message, own }) {
    return (
        <div>

            <div className='mb-2'>
                <div className='relative'>
                    {
                        own ?
                            <>
                                <div className='trapezoid inline-block trapezoid-right'></div>
                                <p className=' bg-white w-fit p-1 pr-[5px] px-3 inline-block absolute top-0 right-[14px] rounded-[5px] '>{message.text}</p>
                            </> :
                            <>
                                <div className='trapezoid inline-block'></div>
                                <p className=' bg-white w-fit p-1 pl-[5px] px-3 inline-block absolute top-0 left-[15px] rounded-[5px]'>{message.text}</p>
                            </>
                    }
                </div>
                <p className={`text-[#868686] text-[11px] mt-[3px] ${own ? 'text-right' : ''}`}>{format(message.createdAt)}</p>
            </div>
        </div>
    )
}

export default Message
