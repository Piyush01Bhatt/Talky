import React, { useEffect, useState } from "react";
import "./Chatroom.css";
import { useStateValue } from "../../StateProvider";

import Chat from "./Chat";
import Sidebar from "./Sidebar";
import axios from "../../helpers/axios";
import { useSocket } from "./SocketProvider";
import FindFriend from "./FindFriend"

function Chatroom({ user }) {
  const [{ room, messages }, dispatch] = useStateValue();
  const socket = useSocket();
  const [modalIsOpen,setModalIsOpen] = useState(false);

  const processReceivedMessage = (recvMsg) => {
    dispatch({
      type: "ADD_MESSAGE",
      item: {
        name: recvMsg.name,
        message: recvMsg.message,
      },
    });
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
      }
    };
  }, [room, messages]);

  const sendMessage = (e, message) => {
    dispatch({
      type: "ADD_MESSAGE",
      item: {
        to: room.id,
        message: message,
        name: "piyush",
      },
    });

    e.preventDefault();
    console.log("sending message");
    /*socket.emit("send-message", {
      from: user._id,
      msg: message,
      to: room.id,
      name: user.name,
    });*/
  };

  const findFriend = ()=>{
    setModalIsOpen(true)
  }

  const closeFindFriend = ()=>{
    setModalIsOpen(false)
  }

  return (
    <div className="chatroom__main" id="chatroom">
      <div className="chatroom__body">
        <Sidebar user={user} findFriend={findFriend} />
        <Chat sendMessage={sendMessage} />
      </div>
      <FindFriend isOpen={modalIsOpen} close={closeFindFriend}
      element={document.getElementById("talky")}/>
    </div>
  );
}

export default Chatroom;
