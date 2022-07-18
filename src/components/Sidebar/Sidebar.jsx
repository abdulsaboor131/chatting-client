import React, { useEffect, useState } from 'react'

import "./Sidebar.scss"
import Addfriend from '../Addfriend/Addfriend'
import ConversationContainer from '../ConversationContainer/ConversationContainer'
import { useSelector } from 'react-redux'
import Chat from '../Chat/Chat'



const Sidebar = () => {

  const [addBox, displayAddBox] = useState(false)
  const mobileView = useSelector((state)=>state.conversation.mobileView)

  const removeAddBox = () => {
    displayAddBox(false)
  }
  const showAddBox = () => {
    displayAddBox(true)
  }


  return (
    <>
      <div className="sidebar-container">
        
        {addBox ? <Addfriend display={addBox} removeDisplay={removeAddBox} />
          :  
          <>
          <Chat display={true} toggleDisplay={mobileView} />
          <ConversationContainer hide={mobileView} showAddBox={showAddBox}/>
          </>
        }
      </div>
    </>
  )
}

export default Sidebar