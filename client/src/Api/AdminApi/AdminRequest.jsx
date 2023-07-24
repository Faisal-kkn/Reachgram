import instance from '../../Axios/AdminAxios'
import axios from 'axios'

export const adminLogin = (data) => axios.post(`${REACT_APP_BACKEND_URL}/admin/adminLogin`, data)
export const AdminAuth = () => instance.get(`/admin/isAdminAuth`)
export const getAllPosts = () => instance.get(`/admin/allPosts`)
export const postBlock = ({ postId, userId }) => instance.put(`/admin/blockPost`, { postId, userId })
export const postUnblock = ({ postId, userId }) => instance.put(`/admin/unBlockPost`, { postId, userId })
export const getUsers = () => instance.get(`/admin/allUsers`)
export const userBlock = (userId) => instance.put(`/admin/blockUser`, { userId })
export const userUnblock = (userId) => instance.put(`/admin/unBlockUser`, { userId })

// export const getPost = (userId) => instance.get(`/home?userId=${userId}`)



