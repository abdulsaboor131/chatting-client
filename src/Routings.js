import React from 'react'
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import {useRoutes} from "react-router-dom"

const Routings = () => {
    let element = useRoutes([
        { path: "/", element: <Home/> },
        { path: "/home", element: <Home/> },
        { path: "/login", element: <Login/> },
        { path: "/signup", element: <Signup/> },
        { path: "*", element: <div>page not found</div> },
      ]);
    return element;  
}

export default Routings