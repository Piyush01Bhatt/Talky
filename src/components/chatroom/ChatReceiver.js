import React from 'react'
import "./ChatReceiver.css"

function ChatReceiver(props) {
    return (
        <p className="chat__receiver">
                    <span className="chat__name">{props.name}</span>
                    {props.messageBody}
    <span className="chat__timestamp">{props.timestamp}</span>
            </p>
    )
}

export default ChatReceiver
