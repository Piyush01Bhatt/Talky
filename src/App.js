import React, { useState, useEffect } from "react";
import "./App.scss";
import Chatroom from "./components/chatroom/Chatroom";
import axios from "./helpers/axios";
import { SocketProvider } from "./components/chatroom/SocketProvider";
import LoginRoom from "./components/login/LoginRoom"
import { useStateValue } from "./StateProvider"

function App() {
  const [{ onlineStatus }, dispatch] = useStateValue()
  const [user, setUser] = useState({})
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPwd, setLoginPwd] = useState("")
  const [isFlipped, setIsFlipped] = useState(false)

  const processLogin = async (setLoading) => {
    try {
      let res = await axios.post("/user/login", {
        email: loginEmail,
        password: loginPwd,
      });
      const resUser = res.data;
      console.log(resUser)
      if (!resUser._id) {
        throw new Error('undefined id received')
      }
      localStorage.setItem('userId', resUser._id)
      localStorage.setItem('userStatus', resUser.status)
      localStorage.setItem('userName', resUser.name)
      setUser(resUser)
      dispatch({
        type: 'SET_ONLINE'
      })
    } catch (e) {
      console.log(e.message);
      alert("login failed");
    } finally {
      setLoading(false) // setLoading hook from login component
    }
  }

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    if (userId) {
      const resUser = {
        name : localStorage.getItem('userName'),
        _id : localStorage.getItem('userId'),
        status: localStorage.getItem('userStatus')
      }
      setUser(resUser)
      dispatch({
        type: 'SET_ONLINE'
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const processLoginEmail = (e) => {
    setLoginEmail(e.target.value)
  };

  const processLoginPassword = (e) => {
    setLoginPwd(e.target.value)
  };

  const flip = () => {
    setIsFlipped(!isFlipped)
  }

  const flipStyle = {
    "width": "100%",
    "height": "100%",
    "alignItems": "center"
  }

  return (
    <div className="app" id="talky">
      { onlineStatus ?  
        (
          <SocketProvider id={user._id} user={user}>
            <Chatroom user={user} />
          </SocketProvider>
        )
        :
        <LoginRoom
          flipStyle={flipStyle}
          isFlipped={isFlipped}
          processLogin={processLogin}
          processLoginEmail={processLoginEmail}
          processLoginPassword={processLoginPassword}
          flip={flip}
        />
      }
    </div>
  );
}

export default App