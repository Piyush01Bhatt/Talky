import React, {useState} from 'react'
import './style.scss'
import talkyLogo from '../../talky_logo.png'
import { Button } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
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

export const Login = props => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false)

  return (
    <div className='base-container'>
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
              placeholder='email'
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
        <Button type='button' className='btn' 
          style={
            loading ? {backgroundColor:'#e0e0e0',
                       color: '#9e9e9e'
                      }:
                      {backgroundColor: '#454fbe',
                        color: '#fff'
                      }
          }
          disabled={loading}
          onClick={(e)=>{
            setLoading(true)
            props.processLogin(setLoading)
          }}>
          Login
        </Button>
        {loading && <CircularProgress size={24} className={classes.buttonProgress}/>}
      </div>
    </div>
  )
}
