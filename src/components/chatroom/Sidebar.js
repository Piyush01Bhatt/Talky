import React, { useState, useEffect } from 'react';
import "./Sidebar.css";
import ChatIcon from "@material-ui/icons/Chat"
import { IconButton, Avatar, makeStyles } from '@material-ui/core';
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import SidebarChat from "./SidebarChat"
import { useStateValue } from '../../StateProvider'
import PersonPinIcon from '@material-ui/icons/PersonPin';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import RequestsModal from './RequestsModal'
import Fab from '@material-ui/core/Fab';
import MyFriendsModal from './MyFriendsModal';
import axios from '../../helpers/axios';
import CircularProgress from '@material-ui/core/CircularProgress'
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import { useSocket } from "./SocketProvider";
import Tooltip from '@material-ui/core/Tooltip';
import EmptyFriendList from './EmptyFriendList'

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

const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
        color: theme.palette.common.black,
    },
    tooltip: {
        backgroundColor: '#f37677',
    },
}));


function Sidebar({ user }) {

    const [{ room, recent_rooms, onlineStatus, requestsCounter }, dispatch] = useStateValue();
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [friendsModelIsOpen, setFriendsModelIsOpen] = useState(false)
    const [friendsLoading, setFriendsLoading] = useState(false)
    const socket = useSocket();
    const classes = useStyles();
    const classesTooltip = useStylesBootstrap();

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
            setFriendsLoading(true)
            const res = await axios.get(`/friends/get_friendlist/${user._id}/${1}/${30}`)
            const addItem = {}
            console.log(res.data.data)
            res.data.data.forEach((item, i) => {
                addItem[item.friendId] = {
                    name: item.name,
                    status: item.status,
                    messages: [],
                    isOnline: item.isOnline,
                    unreadNum: 0,
                }
            })
            dispatch({
                item: addItem,
                type: 'ADD_ROOM'
            })
            setFriendsLoading(false)
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
        if (socket) {
            socket.disconnect()
        }
    }

    const compareRooms = (a, b) => {
        //return b[1].unreadNum - a[1].unreadNum
        if ((b[1].messages.length > 0) && (a[1].messages.length > 0)) {
            const lastMessageTimestamp1 = b[1].messages[b[1].messages.length - 1].timestamp
            const lastMessageTimestamp2 = a[1].messages[a[1].messages.length - 1].timestamp
            return lastMessageTimestamp1 - lastMessageTimestamp2
        }
        return -1
    }

    return (
        <div className='sidebar' id="chatroom_sidebar">
            <div className="sidebar__header">
                <div className="avatar__container">
                    <Avatar className="avatar__icon" />
                </div>

                <div className="sidebar__headerRight">
                    <div className="requests__btn__div">
                        <Tooltip classes={classesTooltip} title="Friend Requests" placement="left" arrow>
                            <IconButton className="action_button" onClick={(e) => setModalIsOpen(true)}>
                                <PersonPinIcon />
                            </IconButton>
                        </Tooltip>
                        {(requestsCounter > 0) && <h3>{requestsCounter}</h3>}
                    </div>
                    <Tooltip classes={classesTooltip} title="Friends Room" placement="left" arrow>
                        <IconButton className="action_button_selected">
                            <ChatIcon />
                        </IconButton>
                    </Tooltip>
                </div>

                <div className="sidebar__left__footer">
                    <Tooltip classes={classesTooltip} title="Logout" placement="left" arrow>
                        <IconButton className='online_button'
                            onClick={() => logout()} >
                            {onlineStatus ? <ToggleOnIcon /> : <ToggleOffIcon />}
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
            <div className="sidebar__right">
                <div className="sidebar__search">
                    <div className="sidebar__searchContainer">
                        <SearchOutlined />
                        <input placeholder="Enter name of friend" type="text" />
                    </div>
                </div>

                <div className={(emptyCheck(recent_rooms)) ? "sidebar__chats__empty":"sidebar__chats"}>
                    {(emptyCheck(recent_rooms)) ? <EmptyFriendList/> :Object.entries(recent_rooms).sort(compareRooms).map((item, index) => (
                        <SidebarChat
                            onClick={processRoomClick}
                            roomName={item[1].name}
                            index={index}
                            key={index}
                            roomId={item[0]}
                            isSelected={room.id === item[0]}
                            unreadNum={item[1].unreadNum}
                            roomStatus={item[1].status}
                        />
                    ))
                    }
                    {friendsLoading && <CircularProgress size={34} className={classes.buttonProgress} /> }
                </div>
                <div className={`add__fab ${classes.fab}`}>
                    <Tooltip classes={classesTooltip} title="Add Friends" placement="left" arrow>
                        <Fab color="primary" aria-label="add"
                            className={classes.fab}
                            onClick={() => {
                                openFriendsModel()
                            }}>
                            <PersonAddIcon />
                        </Fab>
                    </Tooltip>
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
        </div >
    )
}

export default Sidebar
