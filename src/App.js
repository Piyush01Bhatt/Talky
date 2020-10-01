import React from "react";
import logo from "./logo.svg";
import banner from "./manage_chats.svg"
import "./App.scss";
import { Login } from "./components/login";
import { Register } from "./components/login";
import Chatroom from "./components/chatroom/Chatroom";
import axios from "./helpers/axios";
import { useStateValue } from "./StateProvider";
import { SocketProvider } from "./components/chatroom/SocketProvider";
import ReactCardFlip from 'react-card-flip';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginActive: true,
      isChatroomActive: false,
      user: {},
      loginEmail: "",
      loginPwd: "",
      isFlipped: false
    };
  }

  componentDidMount() {
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
      if(! resUser._id){
        throw new Error('undefined id received')
      }
      console.log(`resUser = ${resUser}`);
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

  flip = () => {
    this.setState((prevState) => ({
      ...this.state,
      isFlipped: !prevState.isFlipped,
    }))
  }

  render() {
    const {
      isLoginActive,
      isChatroomActive,
      user
    } = this.state;
    const flipStyle = {
      "width": "100%",
      "height": "100%",
      "align-items": "center"
    }
    return (
      <div className="app" id="talky">
        <div className="app__container">
          { isLoginActive &&
            <div className="banner">
              <div className="banner_image">
                <img src={banner} alt={"banner"}></img>
                <h1>Join and start connecting with your loved ones.</h1>
              </div>
            </div>
          }
          <div className="login">
            <div className="container">
              {isLoginActive &&
                <ReactCardFlip isFlipped={this.state.isFlipped}
                  containerStyle={flipStyle}
                  flipDirection="horizontal"
                >
                  <Login
                    containerRef={(ref) => (this.current = ref)}
                    processLogin={this.processLogin}
                    processLoginEmail={this.processLoginEmail}
                    processLoginPassword={this.processLoginPassword}
                    flip={this.flip}
                  />
                  <Register containerRef={(ref) => (this.current = ref)}
                    flip={this.flip}
                  />
                </ReactCardFlip>
              }
              {isChatroomActive && (
                <SocketProvider id={user._id} user={user}>
                  <Chatroom user={user} />
                </SocketProvider>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
