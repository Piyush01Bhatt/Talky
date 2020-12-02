import React, {useState} from 'react'
import "./FriendSearchList.css"
import { Avatar, IconButton } from '@material-ui/core'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import axios from "../../helpers/axios"
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors';
import CheckIcon from '@material-ui/icons/Check';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import PersonIcon from '@material-ui/icons/Person';

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

function FriendsSearchList({ name, status, personId, index, user, received, requested, accepted, isSelf }) {
    const classes = useStyles();
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const sendRequest = async () => {
        setLoading(true)
        try {
            const res = await axios.post('/friends/friend_request', {
                u_id: personId,
                name: name,
                status: status,
                fo_id: user._id
            })
            if (res){
                setLoading(false)
                setSuccess(true)
            }
        } catch (err) {
            setLoading(false)
            setSuccess(false)
            //setDisable(false)
        }
    }

    const getIcon = () => {

        if(isSelf) {
            return <PersonIcon className="request__icon"/>
        }

        if (requested && !accepted) {
            return <CheckIcon className="request__icon"/>
        }
        if (received && !accepted) {
            return <ArrowDownwardIcon className="request__icon"/>
        }
        if (accepted) {
            return <DoneAllIcon className="request__icon"/>
        }
        if (success) {
            return <CheckIcon className="request__icon"/>
        }

        return <PersonAddIcon className="request__icon"/>
    }
    return (
        <div className="list__main">
            <Avatar className="list__avatar" />
            <div className="list__info">
                <h2>{name}</h2>
                <p>{status}</p>
            </div>
            <div className="fab">
                <IconButton onClick={() => sendRequest()}
                    disabled={accepted || requested || received || success || isSelf}
                    className="send__request">
                    {getIcon()}
                </IconButton>
                {loading && <CircularProgress size={38} className={classes.buttonProgress}/>}
            </div>
        </div>
    )
}

export default FriendsSearchList
