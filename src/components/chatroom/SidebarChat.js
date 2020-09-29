import React from 'react'
import "./SidebarChat.css"
import { Avatar } from '@material-ui/core'

function SidebarChat({onClick,roomName,roomId}) {
    return (
        <div className="sidebarChat" onClick={onClick}>
            <Avatar className="sidebarChat__avatar"/>
            <div className="sidebarChat__info">
                <h2>{roomName}</h2>
                <p>This is the last message .</p>
            </div>
        </div>
    )
}

export default SidebarChat
