import React, { useState } from 'react'
import Modal from 'react-modal'
import './OtpModal.css'
import CancelIcon from '@material-ui/icons/Cancel'
import { Button, IconButton, CircularProgress } from '@material-ui/core'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import axios from '../../helpers/axios'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme)=> ({
  buttonProgress: {
    color: '#454fbe',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  resendButtonProgress: {
    color: 'green',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -17,
    marginLeft: -17,
  }
}))

function OtpModal ({ isOpen, close, element, userEmail, userName, userPassword }) {
  const classes = useStyles()
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)

  const verify_otp = async () => {
    setLoading(true)
    try {
      const res = await axios.post('/user/auth', {
        email: userEmail,
        otp: input
      })
      if (res && res.data.success === true) {
        setLoading(false)
        alert('Otp Verified')
        setInput('')
        close()
      }
    } catch (err) {
      console.log(err)
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  const resendOtp = async () => {
    setResendLoading(true)
    try {
      const res = await axios.post('/user/register', {
        name: userName,
        email: userEmail,
        password: userPassword
      })
      if (res.data.success === true){
        setResendLoading(false)
        alert('otp resent')
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
            <Button onClick={() => verify_otp()} 
              className="otp_verify"
              style={
                loading ? {backgroundColor:'#e0e0e0',
                           color: '#9e9e9e'
                          }:
                          {backgroundColor: '#454fbe',
                            color: '#fff'
                          }
              }
              disabled={loading}>
                Verify
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress}/>}
          </div>
          <div className="otp__resend">
            <IconButton onClick={()=>resendOtp()} className="otpresend__button" disabled={resendLoading}>
              <AutorenewIcon 
              className="otpresend__icon" 
              style={
                resendLoading ? {
                  color: '#e0e0e0 !important'
                } : {
                  color: '#454fbe !important'
                }
              } />
            </IconButton>
            {resendLoading && <CircularProgress size={34} className={classes.resendButtonProgress}/>}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default OtpModal
