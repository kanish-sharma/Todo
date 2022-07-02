import React, { useEffect, useState } from 'react';
import {Navigate, Route, useLocation , Outlet} from "react-router-dom"
import Navbar from "./Navbar";

const ProtectedRoute = ({component: Component, ...rest}) => {
    const [loggedIn, setLoggedIn] = useState(true);
    useEffect(() => {
        const token = sessionStorage.getItem("login");
        token ? setLoggedIn(true) : setLoggedIn(false);
    });
    const location = useLocation();
  return (loggedIn ? <><Navbar loggedIn={loggedIn} /><Outlet/></>:<Navigate to ="/"/>);
};

export default ProtectedRoute