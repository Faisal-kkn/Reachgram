import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from "./pages/userRegister/Signup";
import Signin from "./pages/userLogin/Signin";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Profile from "./pages/Profile/Profile";
import User from "./pages/User/User";
import Home from "./pages/Home/Home";
import Chat from './pages/Chat/Chat';
import Dashboard from "./pages/Dashboard/Dashboard";
import HomeMain from "./pages/HomeMain/HomeMain";
import { AppContext, UserContext } from './AppContext';
import PostUpload from './components/PostUpload/PostUpload';
import AdminSignIn from './pages/AdminSignin/AdminSignin';
import AdminDashboard from './components/Admin/Dashboard/Dashboard';
import AdminUsers from './components/Admin/Users/Users';
import AdminPosts from './components/Admin/Posts/Posts';
function App() { 

  const [showPostModal, setShowPostModal] = useState(false)
  const [editProfileErr, setEditProfileErr] = useState({})
  const [editProfile, setEditProfile] = useState({
    status: false,
    data: {}
  })
  const [ postEdit, setPostEdit] = useState({
    status: false,
    image: '',
    description: '' 
  });

  const [userData, setUserData] = useState({
    image: '',
    id: '',
    name: ''
  })
  

  return (
    <>
      <AppContext.Provider value={{ showPostModal, setShowPostModal, postEdit, setPostEdit, editProfile, setEditProfile, editProfileErr, setEditProfileErr }}>
        <UserContext.Provider value={{ userData, setUserData }}>
          <PostUpload />
          <BrowserRouter>
            <Routes>
              <Route path='/signup' element={<SignUp />} />
              <Route path='/login' element={<Signin />} />
              <Route path='/forgot' element={<ForgotPassword />} />
              <Route exact element={<HomeMain />} >
                <Route path='/' element={<Home />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/UserProfile' element={<User />} />
                <Route path='/chat' element={<Chat />} />
              </Route>

              <Route path='/admin' element={<AdminSignIn />} />
              <Route element={<Dashboard />} >
                <Route path='/admin/dashboard' element={<AdminDashboard />} />
                <Route path='/admin/users' element={<AdminUsers />} />
                <Route path='/admin/posts' element={<AdminPosts />} />
              </Route>
            </Routes>
          </BrowserRouter> 
        </UserContext.Provider>
      </AppContext.Provider>
    </>
  );
}

export default App;
