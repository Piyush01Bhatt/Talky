import React from 'react';
import './style.scss'
import talkyLogo from '../../talky_logo.png'

export const Login = props => {

    return (
        <div className="base-container" ref={props.containerRef}>
            <div className="topHeader">
              <img src={talkyLogo} alt="talky"></img>
              <button onClick={() => props.flip()}>Sign up</button>
            </div>
            <div className="header">
                <h3>Login</h3>
            </div>
            <div className="content">
                <div className="form">
                    <div className="form-group">
                        <input type="text" name="username" placeholder="username"
                            onChange={props.processLoginEmail} />
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" placeholder="password"
                            onChange={props.processLoginPassword} />
                    </div>
                </div>
            </div>
            <div className="footer">
                <button type="button" className="btn"
                    onClick={props.processLogin}
                >
                    Login
                    </button>
            </div>
        </div>
    );
}