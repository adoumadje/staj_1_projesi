import React from "react";
import SignUp from "./components/SignUp";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
