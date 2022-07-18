import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Message/Message';
import "./Chat.scss"
import { ArrowBack, Send } from "@mui/icons-material"
import { io } from "socket.io-client"
import { toggleMobileView } from '../../redux/conversationSlice';

const Chat = ({ display, toggleDisplay }) => {
  var bMusic = new Audio('../../audio/message.mp3')
  const user = useSelector((state) => state.user.data)
  const dispatch = useDispatch()
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([])
  const { conversationId, personName, personImage } = useSelector((state) => state.conversation);
  const scrollRef = useRef(null);
  const socket = useRef(null)

  useEffect(() => {
    socket.current = io("ws://localhost:8000")
    socket.current.emit("addUser", user._id)
  }, [user])

  useEffect(() => {
    const getAllMessages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/messages/" + conversationId);
        setChat(res.data.messages)
      } catch (err) {

      }
    }
    conversationId && getAllMessages()
  }, [conversationId])

  useEffect(() => {
    socket.current.on("receiveMessage", (messageObj) => {
      if (conversationId === messageObj.conversationId) {
        console.log("yess")
        setChat([...chat, messageObj])
      }
      if (messageObj.sender !== user._id) bMusic.play()
    })
    scrollRef.current && scrollRef.current.scrollIntoView({ behaviour: "smooth" })
  }, [message, chat])

  const sendMessage = async () => {
    try {
      const res = await axios.post("http://localhost:5000/messages/send", {
        conversationId,
        sender: user._id,
        message
      }, {
        headers: { "Content-Type": "application/json" }
      })
      socket.current.emit("sendMessage", res.data.message)
      document.querySelector("#msg").innerText = ""
      setMessage("")
    } catch (err) {

    }
  }
  return (
    <div className={`chat-container ${display && "mobile-only"} ${!toggleDisplay && "no-display"}`}>
      {conversationId ? <div className="wrapper">
        <div className="header">
          <ArrowBack className="icon" onClick={() => { dispatch(toggleMobileView({ view: false })) }} />
          <img src={personImage ? "http://localhost:5000/images/" + personImage : "../../images/dummyuser.jpg"} alt="" />
          <span>{personName}</span>
        </div>
        <div className="message-area">
          {chat.length === 0 ? <h3>No Chat History</h3>
            : chat.map((msg, index) => {
              return (
                <div ref={scrollRef}>
                  <Message key={index} sender={msg.sender === user._id} message={msg.message} />
                </div>
              )
            })}
        </div>
        <div className="text-area">
          <div id="msg" className="input-div" onKeyUp={(e) => setMessage(e.target.innerText)} contentEditable={true} placeholder="Type here">
          </div>
          <Send onClick={sendMessage} className="icon" />
        </div>
      </div> : <div>Start Chating with your friends</div>}
    </div>
  )
}

export default Chat