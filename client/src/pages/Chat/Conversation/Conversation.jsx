import React, {useState, useEffect} from 'react'
import axios from 'axios'

import { getChatUser } from '../../../Api/UserApi/UserRequest'
const PF = process.env.REACT_APP_PUBLIC_FOLDER

function Conversation({ currentChatId, conversation, currentUser }) {

    const [user, setUser] = useState(null)

    useEffect(()=>{
        const getUser = async ()=>{
            try {
                const friendId = conversation.members?.find((member) => member != currentUser)
                const { data } = await getChatUser(friendId)
                setUser(data[0])
            } catch (error) {
                console.log(error, 'catch error');
            }
        }
        getUser()

    }, [currentUser, conversation])

  return (
      
      <div className={`flex gap-3 items-center p-3 rounded-[10px] cursor-pointer ${conversation?._id == currentChatId ? 'bg-white text-[#314f5f6e]' : 'bg-[#314f5f6e] text-white' }`} >
        {/* onClick={() => getConversation(chat._id)}  */}
        <div className='w-[50px] h-[50px] overflow-hidden relative'>
            <div className='w-[50px] h-[50px] rounded-full overflow-hidden relative'>
                  <img className='rounded-full' src={user?.profile ? PF + user?.profile : 'https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740&t=st=1669703755~exp=1669704355~hmac=e3cfbee8016a046173a54320da5c08b71fa822fe07e3107865ff80c66ab06c8f'} alt="" />
            </div>
            {/* <span className='w-[15px] h-[15px] bg-green-500 absolute bottom-[2px] right-0 rounded-full'></span> */}
        </div>
        <div >
              <h4 className={`leading-4 overflow-hidden pr-5 overflow-ellipsis whitespace-nowrap text-white max-w-[250px] capitalize font-semibold ${conversation?._id == currentChatId ? ' text-[#314f5f]' : 'text-white' }`}>{user?.fullname}</h4>
              <small className='leading-3 overflow-hidden max-w-[250px] overflow-ellipsis whitespace-nowrap text-[#596C7A]'>@{user?.username}</small>
        </div>
    </div>
  )
}

export default Conversation
