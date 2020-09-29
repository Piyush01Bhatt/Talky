import React from 'react';
import loginImg from '../../login.svg'
import './style.scss'

export   const Login = props => {

        return (
            <div className="base-container" ref={props.containerRef}>
                <div className="header">Login</div>
                <div className="content">
                    <div className="image">
                        <img src={loginImg} />
                    </div>
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" placeholder="username" 
                            onChange={props.processLoginEmail}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="text" name="password" placeholder="password" 
                            onChange={props.processLoginPassword}/>
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