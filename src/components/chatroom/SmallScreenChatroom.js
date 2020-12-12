import React from 'react'
import Chat from "./Chat";
import "./Chatroom.css";
import Sidebar from "./Sidebar";

function SmallScreenChatroom({user, sendMessage, room}) {

  function emptyCheck(value) {
    return Object.keys(value).length === 0
      && value.constructor === Object;
  }

  return (
    <div className="chatroom__body">
      {emptyCheck(room) &&<Sidebar user={user}/>}
      {!emptyCheck(room) && <Chat sendMessage={sendMessage}/>}
    </div>
  )
}

export default SmallScreenChatroom
