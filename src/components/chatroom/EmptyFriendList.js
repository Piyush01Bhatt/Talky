import React from 'react'

function EmptyFriendList() {

  const myStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  }

  const hStyle = {
    color: 'grey'
  }

  return (
    <div style={myStyle}>
      <h2 style={hStyle}>You don't have any friends yet</h2>
    </div>
  )
}

export default EmptyFriendList
