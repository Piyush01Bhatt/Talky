import React, { useEffect } from 'react'
import Modal from '@material-ui/core/Modal';
import "./MyFriendsModal.css"
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import FriendList from './FriendList'
import { useStateValue } from '../../StateProvider'
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { IconButton } from '@material-ui/core';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import axios from '../../helpers/axios';

function MyFriendsModal({ isOpen, handleClose }) {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [{ requests, user, fromMeRequestedFriends, toMeRequestedFriends }, dispatch] = useStateValue();

  const addToRecent = (index, personId, name, status, setLoading, setSuccess) => {
    setLoading(true)
    dispatch({
      type: "ADD_ROOM",
      item: {
        name: name,
        id: personId,
        status: status
      }
    })
    setLoading(false)
    setSuccess(true)
  }

  useEffect(() => {
    
    /*return () => {
      cleanup
    }*/
  }, [])

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
    if (newValue===0) {
      axios.get(`/friends/from_me_requested/${user._id}/${1}/${10}`)
      .then((res) => {
        dispatch({
          type: "ADD_FROM_ME_FRIENDS",
          item: res.data.data
        })
      }, (err) => {
        console.log(err)
      })
    }
    if (newValue===0) {
      axios.get(`/friends/to_me_requested/${user._id}/${1}/${10}`)
         .then((res) => {
           console.log(res.data)
           dispatch({
             type: "ADD_TO_ME_FRIENDS",
             item: res.data.data
           })
         }, (err) => {
           console.log(err)
         })
    }
  };

  const body = (
    <div className='my__friends__body'>
      <AppBar position="sticky">
        <Tabs value={selectedTab} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="My Requested Friends" />
          <Tab label="To Me Requested Friends" />
        </Tabs>
      </AppBar>
      {selectedTab === 0 && (fromMeRequestedFriends.length>0) &&
        fromMeRequestedFriends.map((item,i)=>{
          return  <FriendList
            name={item.name}
            status={item.status}
            personId={item.u_id}
            addToRecent={addToRecent}
          />
        })
      }
      {selectedTab === 1 && (toMeRequestedFriends.length>0) &&
        toMeRequestedFriends.map((item,i)=>{
          return  <FriendList
            name={item.sentUserName}
            status={item.sentUserStatus}
            personId={item.fo_id}
            addToRecent={addToRecent}
          />
        })
      }
    </div>
  );

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        className="my__friends__modal">
        {body}
        <DialogActions>
          <IconButton>
            <ArrowLeftIcon />
          </IconButton>
          <IconButton>
            <ArrowRightIcon />
          </IconButton>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default MyFriendsModal
