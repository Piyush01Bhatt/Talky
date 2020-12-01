import { Avatar, IconButton, CircularProgress } from '@material-ui/core'
import React, {useState} from 'react'
import AddIcon from '@material-ui/icons/Add';
import "./FriendList.css"
import { makeStyles } from '@material-ui/core/styles'
import CheckIcon from '@material-ui/icons/Check';
import { green } from '@material-ui/core/colors';

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

function FriendList({ name, status, personId, index, addToRecent }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  return (
    <div className="friend__list__main">
      <Avatar className="friend__list__avatar"/>
      <div className="friend__list__info">
          <h2>{name}</h2>
          <p>{status}</p>
      </div>
      <div className="add__fab">
        <IconButton className="add__to__recent"
          onClick={()=>{
              addToRecent(index, personId, name, status, setLoading, setSuccess)
            }}
          disabled={loading}
        >
          {success?<CheckIcon className="add__icon"/>:<AddIcon className="add__icon"/>}
        </IconButton>
        {loading && <CircularProgress size={24} className={classes.buttonProgress}/>}
      </div>
    </div>
  )
}

export default FriendList
