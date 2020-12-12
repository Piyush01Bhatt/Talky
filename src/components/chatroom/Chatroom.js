import React from "react";
import "./Chatroom.css";
import { useStateValue } from "../../StateProvider";
import { useSocket } from "./SocketProvider";
import { useMediaQuery } from 'react-responsive'
import BigScreenChatroom from './BigScreenChatroom'
import SmallScreenChatroom from './SmallScreenChatroom'

function Chatroom({ user }) {
  const [{ room, recent_rooms },] = useStateValue();
  const socket = useSocket();

  const isBigScreen = useMediaQuery({ query: '(min-device-width: 500px)' })

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
        {isBigScreen ? <BigScreenChatroom user={user}
          sendMessage={sendMessage}
          room={room}
        />
          :
          <SmallScreenChatroom user={user}
            sendMessage={sendMessage}
            room={room}
          />
        }
      </div>
    </div>
  );
}

export default Chatroom;
