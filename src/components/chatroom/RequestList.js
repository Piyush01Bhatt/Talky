import React from 'react'
import "./RequestList.css"
import { Avatar, IconButton } from '@material-ui/core'
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import axios from "../../helpers/axios"

function RequestList({ name, status, personId, index, user }) {

    return (
        <div className="list__main">
            <Avatar className="list__avatar" />
            <div className="list__info">
                <h2>{name}</h2>
                <p>{status}</p>
            </div>
            <IconButton
                className="send__request">
                <GroupAddIcon className="request__icon" />
            </IconButton>
        </div>
    )
}

export default RequestList
