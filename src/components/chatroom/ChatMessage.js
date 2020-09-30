import React from 'react'
import "./ChatMessage.css"

function ChatMessage(props) {
    return (
        <p className="chat__message">
                    <span className="chat__name">{props.name}</span>
                    {props.messageBody}
    <span className="chat__timestamp">{props.timestamp}</span>
            </p>
    )
}

export default ChatMessage
