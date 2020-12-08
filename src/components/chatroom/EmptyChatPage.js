import React from 'react'
import talkyLogo from '../../talky_logo.png'

function EmptyChatPage() {

  const divStyle = {
    display: 'flex',
    flexDirection: 'column',
    flex: 0.75,
    padding: '15px',
    alignItems: 'center',
    justifyContent: 'center'
  }

  const imageStyle = {
    width: '8em',
    height: '4em'
  }

  const imageContainer = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fddadc',
    borderBottomLeftRadius: '45px',
    borderTopLeftRadius: '45px',
    borderTopRightRadius: '45px',
    padding:'75px',
    justifyContent: 'center',
    alignItems: 'center',
  }

  const heading = {
    color: '#4748a3',
    padding: '10px'
  }

  return (
    <div style={divStyle}>
      <div style={imageContainer}>
        <h1 style={heading}>Welcome To</h1>
        <img style={imageStyle} src={talkyLogo} alt='talky'></img>
      </div>
    </div>
  )
}

export default EmptyChatPage
