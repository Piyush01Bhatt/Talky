import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import { Login } from "./components/login";
import { Register } from "./components/login";
import Chatroom from "./components/chatroom/Chatroom";
import axios from "./helpers/axios";
import { useStateValue } from "./StateProvider";
import { SocketProvider } from "./components/chatroom/SocketProvider";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginActive: true,
      isChatroomActive: false,
      user: {},
      loginEmail: "",
      loginPwd: "",
    };
  }

  componentDidMount() {
    this.rightSide.classList.add("right");
  }

  changeState() {
    console.log("Change State");
    const { isLoginActive } = this.state;

    if (isLoginActive) {
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    } else {
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
    }
    this.setState((prevState) => ({ isLoginActive: !prevState.isLoginActive }));
  }

  processLogin = async () => {
    try {
      let res = await axios.post("/user/login", {
        email: this.state.loginEmail,
        password: this.state.loginPwd,
      });
      const resUser = res.data.body.data;

      console.log(`resUser = ${resUser.email}`);
      this.setState((prevState) => ({
        isLoginActive: false,
        isChatroomActive: !prevState.isChatroomActive,
        user: resUser,
      }));
    } catch (e) {
      console.log(e.message);
      alert("login failed");
    }
  };

  processLoginEmail = (e) => {
    this.setState({ loginEmail: e.target.value });
  };

  processLoginPassword = (e) => {
    this.setState({ loginPwd: e.target.value });
  };

  render() {
    const {
      isLoginActive,
      isChatroomActive,
      user,
      loginEmail,
      loginPwd,
    } = this.state;
    const current = isLoginActive ? "Register" : "Login";
    return (
      <div className="app" id="talky">
        <div className="login">
          <div className="container">
            {isChatroomActive && (
              <SocketProvider id={user._id} user={user}>
                <Chatroom user={user} />
              </SocketProvider>
            )}
            {!isChatroomActive && isLoginActive && (
              <Login
                containerRef={(ref) => (this.current = ref)}
                processLogin={this.processLogin}
                processLoginEmail={this.processLoginEmail}
                processLoginPassword={this.processLoginPassword}
              />
            )}
            {!isChatroomActive && !isLoginActive && (
              <Register containerRef={(ref) => (this.current = ref)} />
            )}
          </div>
          <RightSide
            current={current}
            containerRef={(ref) => (this.rightSide = ref)}
            onClick={this.changeState.bind(this)}
          />
        </div>
      </div>
    );
  }
}

const RightSide = (props) => {
  return (
    <div
      className="right-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};

export default App;
