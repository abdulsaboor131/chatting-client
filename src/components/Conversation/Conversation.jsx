import React from 'react'
import { useEffect,useState } from 'react'
import "./Conversation.scss"
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { selectConversation, toggleMobileView } from '../../redux/conversationSlice'

const Conversation = ({personId,convId}) => {
  const [person, setPerson] = useState(null);
  const userId = useSelector((state)=>state.user.data._id);
  const dispatch = useDispatch()
  const handleConversation = ()=>{

    if (!convId) createNewConversation(); 
    dispatch(selectConversation({convId,image:person.image,name:person.username}))
    dispatch(toggleMobileView({view:true}))
  }
  const createNewConversation = async()=>{
    try{
      const res = await axios.post("http://localhost:5000/conversations/createNew",{
        sender:userId,
        receiver:personId
      })  
      dispatch(selectConversation({convId:res.data._id,image:person.image,name:person.username}))  
    }catch(err){
      console.log(err)
    }
  }
  useEffect(() => {
    const fetchUser = async() => {
      try {
        const res = await axios.get(`http://localhost:5000/users/${personId}`, {
          headers: { "Content-Type": "application/json" }
        })
        const data = await res.data.user
        setPerson(data);
      } catch (err) {
        console.log(err)
      }
    }
    fetchUser()
  }, [personId])
  return (
    person && <div className="conversation" onClick={handleConversation}>
      <img src={person.image ? "http://localhost:5000/images/" + person.image : "../../images/dummyuser.jpg"} alt="" />
      <span className="name">{person.username}</span>
    </div>
  )
}

export default Conversation