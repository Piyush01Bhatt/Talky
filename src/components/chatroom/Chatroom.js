import React, { useEffect, useState } from "react";
import "./Chatroom.css";
import { useStateValue } from "../../StateProvider";

import Chat from "./Chat";
import Sidebar from "./Sidebar";
import axios from "../../helpers/axios";
import { useSocket } from "./SocketProvider";
import FindFriend from "./FindFriend"
import RequestsModal from './RequestsModal'

function Chatroom({ user }) {
  const [{ room, messages }, dispatch] = useStateValue();
  const socket = useSocket();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const processReceivedMessage = (recvMsg) => {
    if (recvMsg.from_id === room.id) {
      dispatch({
        type: "ADD_MESSAGE",
        item: {
          from_name: recvMsg.from_name,
          to_name: recvMsg.to_name,
          message: recvMsg.message,
        },
      });
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("received-message", (message) => {
        console.log("message-received");
        processReceivedMessage(message);
      });
    }
    return () => {
      if (socket) {
        socket.off("received-message");
        socket.off("received-friend-request")
      }
    };
  }, [room, messages]);

  const sendMessage = (e, message) => {
    dispatch({
      type: "ADD_MESSAGE",
      item: {
        to_id: room.id,
        to_name: room.name,
        message: message,
        from_id: user._id,
        from_name: user.name,
      },
    });

    e.preventDefault();
    console.log("sending message");
    socket.emit("send-message", {
      from_id: user._id,
      from_name: user.name,
      msg: message,
      to_id: room.id,
      to_name: room.name,
    });
  };

  const findFriend = () => {
    setModalIsOpen(true)
  }

  const closeFindFriend = () => {
    setModalIsOpen(false)
  }

  return (
    <div className="chatroom__main" id="chatroom">
      <div className="chatroom__body" id="chatroomBody">
        <Sidebar user={user} findFriend={findFriend} />
        <Chat sendMessage={sendMessage} />
      </div>
      <FindFriend isOpen={modalIsOpen} close={closeFindFriend}
        element={document.getElementById("talky")} />
    </div>
  );
}

export default Chatroom;
