import React, {useState, useEffect} from 'react'
import axios from 'axios'

function Conversation({ conversation, currentUser }) {

    const [user, setUser] = useState(null)

    useEffect(()=>{
        const friendId = conversation.members?.find((member) => member != currentUser)
        const getUser = async ()=>{
            axios.get('http://localhost:5000/chat/users?friendId=' + friendId).then((response)=>{
                setUser(response.data[0])
            })
        }
        getUser()
    }, [currentUser, conversation])

  return (
      
    <div className='flex gap-3 items-center bg-[#314f5f6e] p-3 rounded-[10px] cursor-pointer' >
        {/* onClick={() => getConversation(chat._id)}  */}
        <div className='w-[50px] h-[50px] overflow-hidden relative'>
            <div className='w-[50px] h-[50px] rounded-full overflow-hidden relative'>
                  <img className='rounded-full' src={'/images/' + user?.profile} alt="" />
            </div>
            <span className='w-[15px] h-[15px] bg-green-500 absolute bottom-[2px] right-0 rounded-full'></span>
        </div>
        <div >
              <h4 className='leading-4 overflow-hidden pr-5 overflow-ellipsis whitespace-nowrap text-white max-w-[250px]'>{user?.fullname}</h4>
              <small className='leading-3 overflow-hidden max-w-[250px] overflow-ellipsis whitespace-nowrap text-[#596C7A]'>@{user?.username}</small>
        </div>
    </div>
  )
}

export default Conversation
