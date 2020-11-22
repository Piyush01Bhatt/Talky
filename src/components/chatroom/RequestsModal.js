import React, { useState } from 'react'
import Modal from 'react-modal'
import './RequestsModal.css'
import CancelIcon from '@material-ui/icons/Cancel'
import { Button, IconButton, Drawer, createChainedFunction } from '@material-ui/core'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import axios from '../../helpers/axios'
import RequestList from './RequestList'
import { useStateValue } from '../../StateProvider'

function RequestsModal({ isOpen, closeRequests, element }) {
  const [input, setInput] = useState('')
  const [{ requests, user }, dispatch] = useStateValue();

  const acceptRequest = async (index, personId, name, status, setLoading) => {
    setLoading(true)
    try {
      const res = await axios.post('/friends/accept_request', {
        userId: user._id,
        friendId: personId
      })
      if (!res) {
        throw new Error('empty response')
      }
      /*dispatch({
        type: "ADD_ROOM",
        item: {
          name: name,
          id: personId,
          status: status
        }
      })*/
      let presentRequests = [...requests]
      presentRequests.splice(index, 1) // remove the request
      dispatch({
        type: "RESET_REQUESTS",
        item: presentRequests
      })
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const rejectRequest = async (index) => {
    try {

    } catch (err) {
      console.log(err)
    }
  }
  
  return (
    <React.Fragment key={"left"}>
      <Drawer anchor={"left"}
        open={isOpen}
        onClose={closeRequests}
        PaperProps={{ style: { position: 'absolute' } }}
        BackdropProps={{ style: { position: 'absolute' } }}
        ModalProps={{
          container: document.getElementById("chatroomBody"),
          style: {
            position: 'absolute',
          }
        }}
        variant="temporary"
      >
        <div className="drawer__menu">
          {
            (requests.length > 0) ? requests.map((item, i) => {
              return <RequestList
                name={item.sentUserName}
                status={item.sentUserStatus}
                personId={item.fo_id}
                user={user}
                index={i}
                acceptRequest={acceptRequest}
                rejectRequest={rejectRequest}
              />
            }) : <h1>Empty</h1>
          }
        </div>
      </Drawer>
    </React.Fragment >
  )
}

export default RequestsModal
