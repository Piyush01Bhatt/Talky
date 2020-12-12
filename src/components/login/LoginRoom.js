import { Login } from "./login";
import { Register } from "./register";
import React from 'react'
import "../../App.scss";
import banner from "../../manage_chats.svg"
import ReactCardFlip from 'react-card-flip';

function LoginRoom({ flipStyle, isFlipped, processLogin, processLoginEmail, processLoginPassword, flip }) {
  return (
    <div className="app__container">
      <div className="banner">
        <div className="banner_image">
          <img src={banner} alt={"banner"}></img>
          <h1>Join and start connecting with your loved ones.</h1>
        </div>
      </div>
      <div className="login">
        <div className="container">
          <ReactCardFlip isFlipped={isFlipped}
            containerStyle={flipStyle}
            flipDirection="horizontal"
          >
            <Login
              processLogin={processLogin}
              processLoginEmail={processLoginEmail}
              processLoginPassword={processLoginPassword}
              flip={flip}
            />
            <Register
              flip={flip}
            />
          </ReactCardFlip>
        </div>
      </div>
    </div>
  )
}

export default LoginRoom
