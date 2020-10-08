import React, { useState } from 'react'
import Modal from 'react-modal'
import './OtpModal.css'
import CancelIcon from '@material-ui/icons/Cancel'
import { Button, IconButton } from '@material-ui/core'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import axios from '../../helpers/axios'

function OtpModal ({ isOpen, close, element, userEmail }) {
  const [input, setInput] = useState('')

  const verify_otp = async () => {
    try {
      const res = await axios.post('/user/auth', {
        email: userEmail,
        otp: input
      })
      if (res && res.data.body.success === true) {
        alert('Otp Verified')
        setInput('')
        close()
      }
    } catch (err) {
      console.log(err)
      alert(err.message)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      className="Otp__Modal"
      overlayClassName="Overlay"
      appElement={element}
      parentSelector={() => document.querySelector('#register_base')}
    >
      <div className="otpmodal__body">
        <div className="otpclose__button">
          <IconButton className="otpicon_button" onClick={() => {
            close()
          }}>
            <CancelIcon />
          </IconButton>
        </div>

        <div className="otpmodal__input">
          <input value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text" name="otp" placeholder="otp" />
        </div>

        <div className="otpmodal__footer">
          <div className="otpsend__button">
            <Button onClick={() => verify_otp()} className="otp_verify">Verify</Button>
          </div>
          <div className="otp__resend">
            <IconButton className="otpresend__button">
              <AutorenewIcon className="otpresend__icon" />
            </IconButton>
          </div>
        </div>

      </div>
    </Modal>

  )
}

export default OtpModal
