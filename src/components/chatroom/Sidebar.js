import React, { useState, useEffect } from 'react';
import "./Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge"
import ChatIcon from "@material-ui/icons/Chat"
import { IconButton, Avatar, makeStyles } from '@material-ui/core';
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import SidebarChat from "./SidebarChat"
import { useStateValue } from '../../StateProvider'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import RequestsModal from './RequestsModal'
import Fab from '@material-ui/core/Fab';
import MyFriendsModal from './MyFriendsModal';
import axios from '../../helpers/axios';
import CircularProgress from '@material-ui/core/CircularProgress'
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import { useSocket } from "./SocketProvider";

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    buttonProgress: {
        color: '#454fbe',
        //color: '#fff',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: 10,
        marginLeft: 10,
    }
}));

function Sidebar({ user }) {

    const [{ recent_rooms, onlineStatus }, dispatch] = useStateValue();
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [friendsModelIsOpen, setFriendsModelIsOpen] = useState(false)
    const socket = useSocket();
    const classes = useStyles();

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

    useEffect(() => {
        (async function loadFriendList() {
            const res = await axios.get(`/friends/get_friendlist/${user._id}/${1}/${30}`)
            const addItem = {}
            console.log(res.data.data)
            res.data.data.forEach((item, i) => {
                addItem[item.friendId] = {
                    name: item.name,
                    status: item.status,
                    messages: [],
                    isOnline: item.isOnline
                }
            })              
            dispatch({
                item: addItem,
                type: 'ADD_ROOM'
            })
        })()
    }, [])

    const closeRequests = () => {
        setModalIsOpen(false)
    }

    const handleClose = () => {
        setFriendsModelIsOpen(false)
    }

    const openFriendsModel = async () => {
        setFriendsModelIsOpen(true)
    }

    function emptyCheck(value) {
        return Object.keys(value).length === 0
        && value.constructor === Object
    }

    const logout = () => {
        dispatch({
            type: 'LOGOUT',
        })
        if(socket){
          socket.disconnect()
        }
    }

    return (
        <div className='sidebar' id="chatroom_sidebar">
            <div className="sidebar__header">
                <div className="avatar__container">
                    <Avatar className="avatar__icon" />
                </div>

                <div className="sidebar__headerRight">
                    <IconButton className="action_button" onClick={(e) => setModalIsOpen(true)}>
                        <PeopleAltIcon />
                    </IconButton>
                    <IconButton className="action_button">
                        <ChatIcon />
                    </IconButton>
                    <IconButton className="inactive_button" disabled={true}>
                        <DonutLargeIcon />
                    </IconButton>
                </div>

                <div className="sidebar__left__footer">
                    <IconButton className='online_button'
                       onClick={()=>logout()} >
                        {onlineStatus? <ToggleOnIcon/>:<ToggleOffIcon />}
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__right">
                <div className="sidebar__search">
                    <div className="sidebar__searchContainer">
                        <SearchOutlined />
                        <input placeholder="Enter name of friend" type="text" />
                    </div>
                </div>

                <div className="sidebar__chats">
                    {(emptyCheck(recent_rooms)) ? <CircularProgress size={34} className={classes.buttonProgress} /> : Object.entries(recent_rooms).map((item, index) => (
                        <SidebarChat
                            onClick={processRoomClick}
                            roomName={item[1].name}
                            index={index}
                            key={index}
                            roomId={item[0]}
                        />
                    ))
                    }
                </div>
                <div className={`add__fab ${classes.fab}`}>
                    <Fab color="primary" aria-label="add"
                        className={classes.fab}
                        onClick={() => {
                            openFriendsModel()
                        }}>
                        <PersonAddIcon />
                    </Fab>
                </div>
            </div>
            <RequestsModal
                isOpen={modalIsOpen}
                closeRequests={closeRequests}
                element={document.getElementById('talky')}
            />
            <MyFriendsModal
                isOpen={friendsModelIsOpen}
                handleClose={handleClose}
            />
        </div>
    )
}

export default Sidebar
