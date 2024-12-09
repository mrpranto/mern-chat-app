import React from "react";
import Auth from "./pages/auth";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Chat from "./pages/chat";
import Profile from "./pages/profile";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} /> 
        <Route path="/chat" element={<Chat />} /> 
        <Route path="/profile" element={<Profile />} /> 


        <Route path="*" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
