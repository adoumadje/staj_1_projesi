import React from "react";
import SignUp from "./components/SignUp/SignUp";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import BusinessDashboard from "./components/BusinessDashboard";
import SearchResults from "./components/SearchResults/SearchResults";
import { AuthProvider } from "./components/contexts/AuthContext"

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/business-dashboard" element={<BusinessDashboard />} />
            <Route path="/search-results" element={<SearchResults />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
