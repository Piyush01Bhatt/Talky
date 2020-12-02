import React, { useState } from 'react'
import "./RequestList.css"
import { Avatar, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'


const useStyles = makeStyles((theme)=> ({
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -18,
      marginLeft: -18,
    }
  }))

function RequestList({ name, status, personId, index, user, acceptRequest, rejectRequest }) {
    const classes = useStyles();
    const [loadingAccept, setLoadingAccept] = useState(false)
    const [loadingReject, setLoadingReject] = useState(false)

    return (
        <div className="list__main">
            <Avatar className="list__avatar"/>
            <div className="list__info">
                <h2>{name}</h2>
                <p>{status}</p>
            </div>
            <div className="accept__fab">
                <IconButton onClick={(e)=>acceptRequest(index,personId,name,status,setLoadingAccept)}>
                    <CheckIcon className="accept__icon" />
                </IconButton>
                {loadingAccept && <CircularProgress size={38} className={classes.buttonProgress}/>}
            </div>
            <div className="reject__fab">
                <IconButton onClick={()=>rejectRequest(index,personId,name,status,setLoadingReject)}>
                    <CloseIcon className="reject__icon" />
                </IconButton>
                {loadingReject && <CircularProgress size={38} className={classes.buttonProgress}/>}
            </div>
        </div>
    )
}

export default RequestList
