import { Button, CircularProgress } from '@material-ui/core'
import React, { useState } from 'react'
import './style.scss'
import talkyLogo from '../../talky_logo.png'
import OtpModal from './OtpModal'
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
  }
}))

export const Register = props => {
  const classes = useStyles();
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [userInput, setUserInput] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)

  const close = () => {
    setModalIsOpen(false)
  }

  const open = async () => {
    setLoading(true)
    try {
      const res = await axios.post('/user/register', {
        name: userInput.name,
        email: userInput.email,
        password: userInput.password
      })
      if (res.data.success === true){
        setLoading(false)
        setModalIsOpen(true)
      }
    } catch (err) {
      console.log(err.message)
      setLoading(false)
      alert('registration failed')
    }
  }

  return (
    <div className="base-container" id="register_base">
       <div className="base-container-body">
       <div className="topHeader">
        <img src={talkyLogo} alt="talky"></img>
        <div className='mui__button'>
          <Button onClick={() => props.flip()}>Sign in</Button>
        </div>
      </div>
      <div className="header">
        <h3>Register</h3>
      </div>
      <div className="content">
        <div className="form">
          <div className="form-group">
            <input type="text" name="username" placeholder="username"
              value={userInput.name}
              onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <input type="text" name="email" placeholder="email"
              value={userInput.email}
              onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <input type="password" name="password" placeholder="password"
              value={userInput.password}
              onChange={(e) => setUserInput({ ...userInput, password: e.target.value })}
            />
          </div>
        </div>
      </div>
      <div className="footer">
        <Button onClick={() => open()} type="button" className="btn"
          style={
            loading ? {backgroundColor:'#e0e0e0',
                       color: '#9e9e9e'
                      }:
                      {backgroundColor: '#454fbe',
                        color: '#fff'
                      }
          }
          disabled={loading}
        >
          Register
        </Button>
        {loading && <CircularProgress size={24} className={classes.buttonProgress}/>}
      </div>

       </div>
            <OtpModal isOpen={modalIsOpen} close={close}
        userName={userInput.name}
        userPassword={userInput.password}
        element={document.getElementById('talky')}
        userEmail={userInput.email}/>
    </div>
  )
}
