import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from "./pages/userRegister/Signup";
import Signin from "./pages/userLogin/Signin";
import Home from "./pages/Home/Home";

function App() { 
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Signin />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter> 
    </>
  );
}

export default App;
