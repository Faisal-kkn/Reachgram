import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from "./pages/userRegister/Signup";
import Signin from "./pages/userLogin/Signin";
import Home from "./pages/Home/Home";
import { AppContext } from './AppContext';
import PostUpload from './components/PostUpload/PostUpload'

function App() { 

  const [showPostModal, setShowPostModal] = useState(false)

  return (
    <>
      <AppContext.Provider value={{showPostModal, setShowPostModal}}>
        <PostUpload />
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Signin />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter> 
      </AppContext.Provider>
    </>
  );
}

export default App;
