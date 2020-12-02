import React from "react";
import "./Chatroom.css";
import { useStateValue } from "../../StateProvider";

import Chat from "./Chat";
import Sidebar from "./Sidebar";
import { useSocket } from "./SocketProvider";

function Chatroom({ user }) {
  const [{ room, recent_rooms },] = useStateValue();
  const socket = useSocket();

  const sendMessage = (e, message) => {
    /*dispatch({
      type: "ADD_MESSAGE",
      item: {
        to_id: room.id,
        to_name: room.name,
        message: message,
        from_id: user._id,
        from_name: user.name,
        timestamp: Date.now()
      },
    });*/

    recent_rooms[room.id].messages.push({
      to_id: room.id,
      to_name: room.name,
      message: message,
      from_id: user._id,
      from_name: user.name,
      timestamp: Date.now()
    })

    e.preventDefault();
    console.log("sending message");
    socket.emit("send-message", {
      from_id: user._id,
      from_name: user.name,
      msg: message,
      to_id: room.id,
      to_name: room.name,
      timestamp: Date.now()
    });
  };

  return (
    <div className="chatroom__main" id="chatroom">
      <div className="chatroom__body" id="chatroomBody">
        <Sidebar user={user} />
        <Chat sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default Chatroom;
