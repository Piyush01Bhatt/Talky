import React from 'react';
import "./Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge"
import ChatIcon from "@material-ui/icons/Chat"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import { IconButton, Avatar } from '@material-ui/core';
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import SidebarChat from "./SidebarChat"
import {useStateValue} from '../../StateProvider'

function Sidebar({user, findFriend}) {

    const [state, dispatch] = useStateValue();

    const processRoomClick = (roomName,roomId)=>{
        dispatch({
            type:'SET_ROOM',
            item:{
                name:roomName,
                id  :roomId
            }
        })
    }

    return (
        <div className='sidebar'>
            <div className="sidebar__header">
                <Avatar src=""/>
                <div className="sidebar__headerRight">
                    <IconButton >
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton onClick={(e)=>findFriend()}>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>                  
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined/>
                    <input placeholder="Search or start new chat" type="text"/>
                </div>
            </div>

            <div className="sidebar__chats">
                {(user.name==='Pawan') && <SidebarChat 
                    onClick={()=>(processRoomClick("Piyush","5f64f240d5328d29e1c4e8ff"))}
                    roomName={"Piyush"}
                    roomId={"5f64f240d5328d29e1c4e8ff"}
                />}
                {(user.name==='Piyush') && <SidebarChat
                    onClick={()=>(processRoomClick("Pawan","5f6b42673ffbaf4af3827907"))}
                    roomName={"Pawan"}
                    roomId={"5f6b42673ffbaf4af3827907"}
                />}
                <SidebarChat/>
            </div>
        </div>
    )
}

export default Sidebar
