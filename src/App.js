import React from "react";
import SignUp from "./components/SignUp/SignUp";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import Navbar from "./components/Navbar/Navbar";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import BusinessDashboard from "./components/BusinessDashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/business-dashboard" element={<BusinessDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
