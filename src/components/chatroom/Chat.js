import React, { useState, useEffect } from "react";
import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile
} from "@material-ui/icons";
import ChatMessage from "./ChatReceiver";
import ChatReceiver from "./ChatMessage";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import { useStateValue } from "../../StateProvider";

dayjs.extend(relativeTime)

function Chat({ sendMessage }) {
  const [
    { user, room, recent_rooms },
  ] = useStateValue();
  const [input, setInput] = useState("");

  useEffect(() => {
    const chatWindow = document.getElementById('chatBody')
    chatWindow.scrollTo(0,chatWindow.scrollHeight)
  })


  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar className="chat__header__avatar" />
        <div className="chat__headerInfo">
          <h3>{room.name}</h3>
          <p>Last seen at...</p>
        </div>

        <div className="chat__headerRight">
          <IconButton className="inactive__button" disabled={true}>
            <VideoCallIcon />
          </IconButton>
          <IconButton className="inactive__button" disabled={true}>
            <AttachFile />
          </IconButton>
        </div>
      </div>

      <div className="chat__body" id="chatBody">
        {room.id && recent_rooms[room.id].messages.map((item, i) => (
          item.from_name === user.name ?
            <ChatMessage
              name={user.name}
              messageBody={item.message}
              key={i}
              timestamp={dayjs(item.timestamp).fromNow()}
            />
            :
            <ChatReceiver
              name={item.from_name}
              key={i}
              messageBody={item.message}
              timestamp={dayjs(item.timestamp).fromNow()}
            />
        ))}
      </div>

      <div className="chat__footer">
        <IconButton className="inactive__button" disabled={true}>
          <InsertEmoticonIcon />
        </IconButton>
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={(e) => {
            sendMessage(e, input)
            setInput('')
          }} type="submit">
            Send a Message
          </button>
        </form>
        <IconButton className="inactive__button" disabled={true}>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
