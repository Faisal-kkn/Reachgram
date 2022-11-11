import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from "./pages/userRegister/Signup";
import Signin from "./pages/userLogin/Signin";
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";
import HomeMain from "./pages/HomeMain/HomeMain";
import { AppContext, UserContext } from './AppContext';
import PostUpload from './components/PostUpload/PostUpload'

function App() { 

  const [showPostModal, setShowPostModal] = useState(false)
  const [showEditPostModal, setShowEditPostModal] = useState(false)
  const [userData, setUserData] = useState({
    id: '',
    name: ''
  })
  

  return (
    <>
      <AppContext.Provider value={{ showPostModal, setShowPostModal, showEditPostModal, setShowEditPostModal }}>
        <UserContext.Provider value={{ userData, setUserData }}>
          <PostUpload />
          <BrowserRouter>
            <Routes>
              <Route path='/signup' element={<SignUp />} />
              <Route path='/login' element={<Signin />} />
              {/* <Route path='/' element={<Home />} /> */}
            </Routes>
          </BrowserRouter> 

          <BrowserRouter>
            <Routes>
              <Route path='/' exact element={<HomeMain />} >
                <Route path='/' element={<Home />} />
                <Route path='/profile' element={<Profile />} />
              </Route>
            </Routes>
          </BrowserRouter> 
        </UserContext.Provider>
      </AppContext.Provider>
    </>
  );
}

export default App;
