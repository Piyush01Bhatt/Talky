import React from 'react'
import "./RequestList.css"
import { Avatar, IconButton } from '@material-ui/core'
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import CloseIcon from '@material-ui/icons/Close';
import axios from "../../helpers/axios"
import CheckIcon from '@material-ui/icons/Check';

function RequestList({ name, status, personId, index, user, acceptRequest, rejectRequest }) {

    return (
        <div className="list__main">
            <Avatar className="list__avatar" />
            <div className="list__info">
                <h2>{name}</h2>
                <p>{status}</p>
            </div>
            <IconButton onClick={(e)=>acceptRequest(index,personId,name,status)}>
                <CheckIcon className="accept__icon" />
            </IconButton>
            <IconButton onClick={()=>rejectRequest(index,personId,name,status)}>
                <CloseIcon className="reject__icon" />
            </IconButton>
        </div>
    )
}

export default RequestList
