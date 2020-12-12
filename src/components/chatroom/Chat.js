import React, { useState, useEffect } from "react";
import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import ChatMessage from "./ChatMessage";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ChatReceiver from "./ChatReceiver";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { useStateValue } from "../../StateProvider";
import { useMediaQuery } from 'react-responsive'

dayjs.extend(relativeTime)

function Chat({ sendMessage }) {
  const [
    { user, room, recent_rooms },
    dispatch] = useStateValue();
  const [input, setInput] = useState("");
  const [inputRows, setInputRows] = useState(1)
  const [entersRow, setEntersRow] = useState(0)

  const isBigScreen = useMediaQuery({ query: '(min-device-width: 500px)' })

  useEffect(() => {
    const chatWindow = document.getElementById('chatMessages')
    chatWindow.scrollTo(0, chatWindow.scrollHeight)
  })

  const goBack = () => {
    dispatch({
      type: 'UNSET_ROOM',
    })
  }

  const getInputArea = () => document.getElementById('inputArea').offsetWidth

  return (
    <div className="chat">
      <div className="chat__header">
        {!isBigScreen && <IconButton onClick={() => goBack()}>
          <ArrowBackIcon className="arrowback__icon" />
        </IconButton>}
        <Avatar className="chat__header__avatar" />
        <div className="chat__headerInfo">
          <h3>{room.name}</h3>
          <p></p>
        </div>

        <div className="chat__headerRight">
        </div>
      </div>

      <div className="chat__body" id="chatBody">
        <div className="chat__messages" id="chatMessages">
          {room.id && recent_rooms[room.id].messages.map((item, i) => {
            return (item.from_name === user.name) ?
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
          })}
        </div>
      </div>
      <div className="chat__footer">
        <div className="chat__footer__body">
          <div className="emoticondiv">
            <IconButton className="inactive__button" disabled={true}>
              <InsertEmoticonIcon />
            </IconButton>
          </div>
          <div className="chatfooter__form__div">
            <textarea value={input}
             id="inputArea"
              onKeyPress={(e) => {
                if (e.shiftKey && e.key=== "Enter") {
                  setEntersRow(entersRow+1)
                  //setInput(input+'\n')
                }else {
                if (e.key === "Enter") {
                  sendMessage(e, input)
                  setInput('')
                  setEntersRow(0)
                }}
              }}
              onChange={(e) => {
                setInput(e.target.value)
                const inpW = Math.floor(getInputArea()/9)
                isBigScreen? setInputRows((input.length / inpW) + 1 + entersRow):setInputRows((input.length / 40) + 1)
              }}
              rows={Math.min(4, inputRows)} autoFocus={true} />
          </div>
          <div className="micdiv">
            <IconButton onClick={(e) => {
              sendMessage(e, input)
              setEntersRow(0)
              setInput('')
            }}>
              <SendIcon className="send__icon"/>
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
