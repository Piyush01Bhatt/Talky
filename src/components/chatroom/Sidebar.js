import React, {useState} from 'react';
import "./Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge"
import ChatIcon from "@material-ui/icons/Chat"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import { IconButton, Avatar } from '@material-ui/core';
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import SidebarChat from "./SidebarChat"
import { useStateValue } from '../../StateProvider'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import RequestsModal from './RequestsModal'

function Sidebar({ user, findFriend }) {

    const [{ recent_rooms }, dispatch] = useStateValue();
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const processRoomClick = (roomName, roomId, key) => {
        dispatch({
            type: 'SET_ROOM',
            item: {
                name: roomName,
                id: roomId,
                key: key,
            }
        })
    }

    const closeRequests = ()=>{
        setModalIsOpen(false)
    }

    return (
        <div className='sidebar' id="chatroom_sidebar">
            <div className="sidebar__header">
                <div className="avatar__container">
                    <Avatar className="avatar__icon" />
                </div>

                <div className="sidebar__headerRight">
                    <IconButton className="inactive_button" disabled={true}>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton className="action_button" onClick={(e)=>setModalIsOpen(true)}>
                        <ChatIcon />
                    </IconButton>
                    <IconButton onClick={(e) => findFriend()} className="action_button">
                        <PeopleAltIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__right">
                <div className="sidebar__search">
                    <div className="sidebar__searchContainer">
                        <SearchOutlined />
                        <input placeholder="Search or start new chat" type="text" />
                    </div>
                </div>

                <div className="sidebar__chats">
                    {(recent_rooms) && recent_rooms.map((item, index) => (
                        <SidebarChat
                            onClick={processRoomClick}
                            roomName={item.name}
                            index={index}
                            key={index}
                            roomId={item.id}
                        />
                    ))
                    }
                </div>
            </div>
            <RequestsModal 
                isOpen={modalIsOpen} 
                closeRequests={closeRequests}
                element={document.getElementById('talky')}
            />
        </div>
    )
}

export default Sidebar
