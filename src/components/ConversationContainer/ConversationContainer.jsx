import React,{useEffect,useState} from 'react'
import axios from "axios"
import {useSelector} from "react-redux"
import Conversation from '../Conversation/Conversation'
import "./ConversationContainer.scss"
import { Search,PersonAddAlt } from '@mui/icons-material'

const ConversationContainer = ({hide,showAddBox}) => {
    const userId = useSelector((state)=>state.user.data._id);
  const [conversations,setConversations] = useState([])
    useEffect(()=>{
        const getConversations = async()=>{
          try{
            const res = await axios.get("http://localhost:5000/conversations/"+userId,{
              headers:{"Content-Type":"application/json"}
            })
            setConversations(res.data.conversations);
          }catch(err){
            
          }
        }
        getConversations()
      },[userId])
    
      const handleFilter = (e)=>{
    
        conversations.forEach((conv)=>{
          Object.values(conv).forEach((value)=>{
            console.log(value);
          })
        })
      }
  return (
    <div className={`conv-wrapper ${hide && "hide"}`}>
        <div className="header">
              <span className="heading">Conversations</span>
              <PersonAddAlt className="add-icon" onClick={()=>showAddBox(true)}/>
            </div>
        <div className="body">
            <div className="search-div">
              <input type="text" onChange={handleFilter} placeholder='search' />
              <Search className='search-icon'/>
            </div>
          <div className="conversation-container">
            {conversations && conversations.length===0?<h5>No Conversations</h5>
            :conversations.map((conv)=>{
              const {sender,receiver} = conv.members
              const friendId = sender===userId?receiver:sender;
              return <Conversation key={conv._id} personId={friendId} convId={conv._id}/>
            })}
          </div>
        </div>
          </div>
  )
}

export default ConversationContainer