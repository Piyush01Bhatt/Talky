import React from 'react'
import './ChatReceiver.css'

function ChatReceiver(props) {
  return (
    <div className="chat__receiver__body">
      <p className="chat__receiver">
        <span className="chatreceiver__name">{props.name}</span>
        {props.messageBody}
      </p>
      <p className="chatreceiver__timestamp">{props.timestamp}</p>
    </div>
  )
}

export default ChatReceiver
