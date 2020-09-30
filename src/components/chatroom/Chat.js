import React, { useState } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  MoreVert,
  SearchOutlined,
  InsertEmoticon,
  SettingsInputAntenna,
  MessageSharp,
} from "@material-ui/icons";
import ChatMessage from "./ChatReceiver";
import ChatReceiver from "./ChatMessage";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import axios from "../../helpers/axios";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import { useStateValue } from "../../StateProvider";

function Chat({ sendMessage }) {
  const [
    { user, room, messages },
    dispatch,
  ] = useStateValue();
  const [input, setInput] = useState("");


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

      <div className="chat__body">
        {messages && messages.map((item, i) => (
          item.name === user.name ?
            <ChatMessage
              name={user.name}
              messageBody={item.message}
              timestamp={Date.now()}
            />
            :
            <ChatReceiver
              name={item.name}
              messageBody={item.message}
              timestamp={Date.now()}
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
