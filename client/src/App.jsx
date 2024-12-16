import React, { Children, useEffect, useState } from "react";
import Auth from "./pages/auth";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Chat from "./pages/chat";
import Profile from "./pages/profile";
import { useAppStore } from "./store";
import apiClient from "./lib/api-client";
import { GET_USER_ROUTE } from "./utils/constants";

const PriveteRoute = ({children}) => {
  const {userInfo} = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to="/auth" />;
}

const AuthRoute = ({children}) => {
  const {userInfo} = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/chat" /> : children;
}


function App() {

  const {userInfo, setUserInfo} = useAppStore();
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const getUserData = async () => {
      try{

        const response = await apiClient.get(GET_USER_ROUTE, {
          withCredentials: true
        })

        if(response.status == 200){
          setUserInfo(response.data)
        }else{
          setUserInfo(undefined);
        }

      }catch(err){
        console.log(err);
        setUserInfo(undefined);
      }
      finally{
        setLoading(false);
      }
    }
    

    if(!userInfo){
      getUserData();
    }else{
      setLoading(false);
    }

  }, [userInfo, setUserInfo]);

  if(loading){
    return <div>Loading....</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthRoute>
          <Auth/>
        </AuthRoute>} /> 

        <Route path="/chat" element={<PriveteRoute>
          <Chat/>
        </PriveteRoute>} /> 

        <Route path="/profile" element={<PriveteRoute>
          <Profile />
        </PriveteRoute>} /> 


        <Route path="*" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
