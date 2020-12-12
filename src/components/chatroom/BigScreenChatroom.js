import React from 'react'
import Chat from "./Chat";
import "./Chatroom.css";
import Sidebar from "./Sidebar";
import EmptyChatPage from './EmptyChatPage'

function BigScreenChatroom({user, sendMessage, room}) {

  function emptyCheck(value) {
    return Object.keys(value).length === 0
      && value.constructor === Object;
  }

  return (
    <div className="chatroom__body" id="chatroomBody">
      <Sidebar user={user}/>
      {emptyCheck(room)?<EmptyChatPage/>:<Chat sendMessage={sendMessage}/>}
    </div>
  )
}

export default BigScreenChatroom
