import React, { useState } from 'react'
import Modal from 'react-modal'
import './RequestsModal.css'
import CancelIcon from '@material-ui/icons/Cancel'
import { Button, IconButton, Drawer } from '@material-ui/core'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import axios from '../../helpers/axios'
import RequestList from './RequestList'

function RequestsModal({ isOpen, closeRequests, element }) {
  const [input, setInput] = useState('')

  const acceptRequest = async () => {

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
          <RequestList/>
          <RequestList/>
          <RequestList/>
          <RequestList/>
          <RequestList/>
        </div>
      </Drawer>
    </React.Fragment >
  )
}

export default RequestsModal
