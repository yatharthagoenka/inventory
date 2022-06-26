import { useCallback, useContext, useEffect, useState } from "react";

import Index from "./components/index";
import Header from "./components/header";
import AuthPage from "./components/authPage";
import AddCat from "./components/addCat";
import { UserContext } from "./context/UserContext";

import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Profile from "./components/profile";

function App() {

  const [userContext, setUserContext] = useContext(UserContext);


  return !localStorage.getItem("userJWT")?(
    <AuthPage/>
  ):(
    <>
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Index/>} />
        <Route path="/addCat" element={<AddCat/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </Router>
    
    </>
  )
}

export default App;
