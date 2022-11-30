import React, {useEffect, useState} from 'react'
import axios from 'axios'

function Users() {

    const [allUsers, setAllUsers] = useState([])

    const adminUsers = ()=>{
        axios.get('http://localhost:5000/admin/allUsers', {
            headers: {
                "x-access-token": localStorage.getItem("adminToken"),
            },
        }).then(({data}) => {
            setAllUsers(data)
        })
    }

    const blockUser = (userId)=>{
        axios.put('http://localhost:5000/admin/blockUser', { userId: userId }, {
            headers: {
                "x-access-token": localStorage.getItem("adminToken"),
            },
        }).then(({ data }) => {
            adminUsers()
        })
    }
    
    const unBlockUser = (userId) => {
        axios.put('http://localhost:5000/admin/unBlockUser', { userId: userId }, {
            headers: {
                "x-access-token": localStorage.getItem("adminToken"),
            },
        }).then(({ data }) => {
            adminUsers()
        })
    }

    useEffect(()=>{
        adminUsers()
    }, [])

    return (
        <>

            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">
                                No
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Profile
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Full name
                            </th>
                            <th scope="col" className="py-3 px-6">
                                User Name
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Email
                            </th>
                            
                            <th scope="col" className="py-3 px-6">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allUsers.map((user, index)=>{
                                return(
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="py-4 px-6">
                                            {index+1}
                                        </td>
                                        <td className="py-4 px-6">
                                            <img src={`/images/${user.profile}`} width="50px" className='rounded-full' alt="" />
                                        </td>
                                        <td className="py-4 px-6">
                                            {user.fullname}
                                        </td>
                                        <td className="py-4 px-6">
                                            {user.username}
                                        </td>
                                        <td className="py-4 px-6">
                                            {user.email}
                                        </td>
                                        <td className="flex items-center py-4 px-6 space-x-3">
                                            {user.status ? 
                                                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => unBlockUser(user._id) }>UnBlock</button> :
                                                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => blockUser(user._id) }>Block</button>
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default Users
