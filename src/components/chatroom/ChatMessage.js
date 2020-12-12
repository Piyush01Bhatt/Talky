import React from 'react'
import "./ChatMessage.css"

function ChatMessage(props) {
    return (
        <div className="chat__message__body">
            <p className="chat__message">
                <span className="chatmessage__name">{props.name}</span>
                {props.messageBody}
            </p>
            <p className="chatmessage__timestamp">{props.timestamp}</p>
        </div>
    )
}

export default ChatMessage
