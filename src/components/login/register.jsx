import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import talkyLogo from '../../talky_logo.png'
import OtpModal from './OtpModal'
import axios from '../../helpers/axios'

export const Register = props => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [userInput, setUserInput] = useState({
    name: '',
    email: '',
    password: ''
  })

  const close = () => {
    setModalIsOpen(false)
  }

  const open = async () => {
    try {
      console.log(userInput)
      /*const res = await axios.post('/user/register', {
        name: userInput.name,
        email: userInput.email,
        password: userInput.password
      })*/
      setModalIsOpen(true)
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div className="base-container" id="register_base" ref={props.containerRef}>
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
        <Button onClick={() => open()} type="button" className="btn">
          Register
        </Button>
      </div>
      <OtpModal isOpen={modalIsOpen} close={close}
        element={document.getElementById('talky')}
        userEmail={userInput.email}/>
    </div>
  )
}
