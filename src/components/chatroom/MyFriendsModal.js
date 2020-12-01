import React from 'react'
import "./MyFriendsModal.css"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { IconButton } from '@material-ui/core';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import GlobalSearch from '../chatroom/GlobalSearch'

function MyFriendsModal({ isOpen, handleClose }) {
  const body = (
    <div className='my__friends__body'>
      <GlobalSearch/>
      {/*selectedTab === 2 && (toMeRequestedFriends.length>0) &&
        toMeRequestedFriends.map((item,i)=>{
          return  <FriendList
            name={item.sentUserName}
            status={item.sentUserStatus}
            personId={item.fo_id}
            key={i}
            addToRecent={addToRecent}
          />
        })*/
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
