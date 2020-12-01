import React, { useState } from 'react'
import './RequestsModal.css'
import { Drawer } from '@material-ui/core'
import axios from '../../helpers/axios'
import RequestList from './RequestList'
import { useStateValue } from '../../StateProvider'

function RequestsModal({ isOpen, closeRequests, element }) {
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
      const item = {}
      item[personId] = {
        name,
        status,
        messages:[]
      }
      dispatch({
        item,
        type: "ADD_ROOM"
      })
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
        <div className="drawer__body">
          <div className="requests__heading">
            <h3>Friend Requests</h3>
          </div>

          <div className="drawer__menu">
            {
              (requests.length > 0) && requests.map((item, i) => {
                return <RequestList
                  name={item.sentUserName}
                  status={item.sentUserStatus}
                  personId={item.fo_id}
                  user={user}
                  index={i}
                  acceptRequest={acceptRequest}
                  rejectRequest={rejectRequest}
                />
              })
            }
          </div>
        </div>
      </Drawer>
    </React.Fragment >
  )
}

export default RequestsModal
