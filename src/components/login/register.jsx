import React from "react";
import loginImg from "../../login.svg";
import talkyLogo from '../../talky_logo.png'

export const Register = props => {
  return (
    <div className="base-container" ref={props.containerRef}>
      <div className="topHeader">
        <img src={talkyLogo} alt="talky"></img>
        <button onClick={() => props.flip()}>Sign in</button>
      </div>
      <div className="header">
        <h3>Register</h3>
      </div>
      <div className="content">
        <div className="form">
          <div className="form-group">
            <input type="text" name="username" placeholder="username" />
          </div>
          <div className="form-group">
            <input type="text" name="email" placeholder="email" />
          </div>
          <div className="form-group">
            <input type="text" name="password" placeholder="password" />
          </div>
        </div>
      </div>
      <div className="footer">
        <button type="button" className="btn">
          Register
          </button>
      </div>
    </div>
  );
}