import React from 'react'
import "./FriendSearchList.css"
import { Avatar, IconButton } from '@material-ui/core'
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import axios from "../../helpers/axios"

function FriendsSearchList({ name, status, personId, index, user }) {

    const sendRequest = async () => {
        try {
            const res = await axios.post('/friends/friend_request', {
                u_id: personId,
                name: name,
                status: status,
                fo_id: user._id
            })
            if (res)
                console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="list__main">
            <Avatar className="list__avatar" />
            <div className="list__info">
                <h2>{name}</h2>
                <p>{status}</p>
            </div>
            <IconButton onClick={() => sendRequest()}
                className="send__request">
                <GroupAddIcon className="request__icon" />
            </IconButton>
        </div>
    )
}

export default FriendsSearchList
