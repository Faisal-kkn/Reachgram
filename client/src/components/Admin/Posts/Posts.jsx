import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Posts() {

    const [allPosts, setAllPosts] = useState([])

    const adminPosts = () => {
        axios.get('http://localhost:5000/admin/allPosts', {
            headers: {
                "x-access-token": localStorage.getItem("adminToken"),
            },
        }).then(({ data }) => {
            setAllPosts(data)
        })
    }

    const blockpost = (postId, userId) => {
        axios.put('http://localhost:5000/admin/blockPost', { postId, userId }, {
            headers: {
                "x-access-token": localStorage.getItem("adminToken"),
            },
        }).then(({ data }) => {
            adminPosts()
        })
    }

    const unBlockPost = (postId, userId) => {
        axios.put('http://localhost:5000/admin/unBlockPost', { postId, userId }, {
            headers: {
                "x-access-token": localStorage.getItem("adminToken"),
            },
        }).then(({ data }) => {
            adminPosts()
        })
    }

    useEffect(() => {
        adminPosts()
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
                                Post
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Full name
                            </th>
                            <th scope="col" className="py-3 px-6">
                                User Name
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Reports
                            </th>

                            <th scope="col" className="py-3 px-6">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allPosts.map((post, index) => {
                                return (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="py-4 px-6">
                                            {index + 1}
                                        </td>
                                        <td className="py-4 px-6">
                                            <img src={`/images/${post.postImage}`} width="50px" className='rounded-full' alt="" />
                                        </td>
                                        <td className="py-4 px-6">
                                            {post.user[0]}
                                        </td>
                                        <td className="py-4 px-6">
                                            {post.username}
                                        </td>
                                        <td className="py-4 px-6">
                                            {post.postReport}
                                        </td>
                                        <td className="flex items-center py-4 px-6 space-x-3">
                                            {post.postStatus ?
                                                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => unBlockPost(post.postId, post.userId[0])}>UnBlock</button> :
                                                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => blockpost(post.postId, post.userId[0])}>Block</button>
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

export default Posts;
