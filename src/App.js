import React from "react";
import SignUp from "./components/SignUp/SignUp";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import BusinessDashboard from "./components/BusinessDashboard";
import SearchResults from "./components/SearchResults/SearchResults";
import { AuthProvider } from "./components/contexts/AuthContext"
import { RequireAuth } from "./components/contexts/RequireAuth";
import SearchProvider from "./components/contexts/SearchContext";

function App() {
  // navigator.geolocation.getCurrentPosition(position => {})

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <SearchProvider>
            <Routes>
              <Route path="*" element={<Navigate to='/login' replace />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/user-dashboard" 
                element={
                  <RequireAuth>
                    <UserDashboard />
                  </RequireAuth>
                } 
              />
              <Route path="/business-dashboard" 
                element={
                  <RequireAuth>
                    <BusinessDashboard />
                  </RequireAuth>
                } 
              />
              <Route path="/search-results" 
                element={
                  <RequireAuth>
                    <SearchResults />
                  </RequireAuth>
                } 
              />
            </Routes>
          </SearchProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
