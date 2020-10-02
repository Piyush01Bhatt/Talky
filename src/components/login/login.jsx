import React from 'react'
import './style.scss'
import talkyLogo from '../../talky_logo.png'
import { Button } from '@material-ui/core'

export const Login = props => {
  return (
    <div className='base-container' ref={props.containerRef}>
      <div className='topHeader'>
        <img src={talkyLogo} alt='talky'></img>
        <div className='mui__button'>
          <Button onClick={() => props.flip()}>Sign up</Button>
        </div>
      </div>
      <div className='header'>
        <h3>Login</h3>
      </div>
      <div className='content'>
        <div className='form'>
          <div className='form-group'>
            <input
              type='text'
              name='username'
              placeholder='username'
              onChange={props.processLoginEmail}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              name='password'
              placeholder='password'
              onChange={props.processLoginPassword}
            />
          </div>
        </div>
      </div>
      <div className='footer'>
        <Button type='button' className='btn' onClick={props.processLogin}>
          Login
        </Button>
      </div>
    </div>
  )
}
