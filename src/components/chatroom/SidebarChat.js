import React from 'react'
import './SidebarChat.css'
import { Avatar } from '@material-ui/core'
import { useStateValue } from '../../StateProvider'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'

function SidebarChat({ onClick, roomName, index, roomId, isSelected }) {
  const [{ recent_rooms }] = useStateValue()
  return (
    <div className={isSelected ? ('sidebarChat '.concat('sidebarChat_selected')) : 'sidebarChat'}
      onClick={() => onClick(roomName, roomId, index)}
    >
      <div className="avatar__div">
        <Avatar className="sidebarChat__avatar"/>
        <FiberManualRecordIcon className={recent_rooms[roomId].isOnline?"status__online":"status__offline"}/>
      </div>
      <div className="sidebarChat__info">
        <h2>{roomName}</h2>
        <p>This is the last message .</p>
      </div>
    </div>
  )
}

export default SidebarChat
