import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Chat from '../../components/Chat/Chat'
import Sidebar from '../../components/Sidebar/Sidebar'
import Topbar from '../../components/Topbar/Topbar'
import "./Home.scss"


const Home = () => {
  const loggedIn = useSelector((state) => state.user.loggedIn)
  const navigate = useNavigate();
  useEffect(() => {
    const checkUser = () => {
      if (!loggedIn) navigate("/login")
    }
    checkUser();
  }, [loggedIn, navigate])
  return (
    loggedIn && <div className="home-container">
      < Topbar />
      <div className="home-body">
        <Sidebar />
        <Chat />
      </div>
    </div >

  )
}

export default Home