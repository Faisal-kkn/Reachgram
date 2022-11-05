import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from "./pages/userRegister/Signup";

function App() { 
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      <h1 className="text-3xl bg-black text-yellow-700 font-bold underline">
        Hello world!
      </h1>
    </>
  );
}

export default App;
