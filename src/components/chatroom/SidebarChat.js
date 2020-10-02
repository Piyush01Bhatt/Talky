import React from 'react'
import "./SidebarChat.css"
import { Avatar } from '@material-ui/core'
import { useStateValue } from '../../StateProvider';

function SidebarChat({ onClick, roomName, index, roomId}) {
    const [{room }] = useStateValue();
    return (
        <div className={(room.key===index)?("sidebarChat ".concat("sidebarChat_selected")):"sidebarChat"}
            onClick={() => onClick(roomName, roomId, index)}
        >
            <Avatar className="sidebarChat__avatar" />
            <div className="sidebarChat__info">
                <h2>{roomName}</h2>
                <p>This is the last message .</p>
            </div>
        </div>
    )
}

export default SidebarChat
