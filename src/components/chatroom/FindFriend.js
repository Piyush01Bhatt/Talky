import { SearchOutlined } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./FindFriend.css";
import CancelIcon from "@material-ui/icons/Cancel";
import { IconButton } from "@material-ui/core";
import FriendsSearchList from "./FriendsSearchList"
import axios from "../../helpers/axios"

function FindFriend({ isOpen, close, element }) {
  //const [people,setPeople] = useState([])


  /*useEffect(async () => {
    try{
      let res = await axios.get("/user/get_users")
      if(res){
        console.log(res.data)
      }
    }catch(err){
      console.log(err.message)
    }
    
  }, [])
*/
  return (
    <div className="main">
      <Modal
        isOpen={isOpen}
        appElement={element}
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="modal__body">
          <div className="modal__search">
            <div className="modal__searchContainer">
              <SearchOutlined />
              <input placeholder="Search for new friends" type="text" />
            </div>
            <IconButton onClick={() => close()}>
                <CancelIcon />
              </IconButton>
          </div>

          <div className="modal__friends">
              <FriendsSearchList
                name={"Piyush"}
                status={"In my own lane, on my own frequency"}
              />
              <FriendsSearchList
                name={'Pawan'}
                status={'This world is beautiful'}
              />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default FindFriend;
