import { SearchOutlined } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./FindFriend.css";
import CancelIcon from "@material-ui/icons/Cancel";
import { IconButton } from "@material-ui/core";
import FriendsSearchList from "./FriendsSearchList"
import axios from "../../helpers/axios"
import { useStateValue } from "../../StateProvider";

function FindFriend({ isOpen, close, element }) {
  const [people, setPeople] = useState([])
  const [searchText, setSearchText] = useState('')
  const [{ user }, dispatch] = useStateValue();

  const search = async (e) => {
    e.preventDefault();
    let lastPeople = people;
    lastPeople = []
    let lastId = "fake"
    console.log(people.length)
    if (lastPeople.length > 0) {
      lastId = lastPeople[lastPeople.length - 1]._id;
    }
    try {
      const query = {
        queryName: searchText,
        last_id: lastId,
        u_id: user._id,
        num: 10
      };
      console.log(query)
      const res = await axios.post("/user/get_users",query )
      if (!res) {
        throw new Error('empty response')
      }
      setPeople(res.data.body.data)
    } catch (e) {
      console.log(e.message)
      setPeople([])
    } finally {
      setSearchText('')
    }
  }

  return (
    <div className="main">
      <Modal
        isOpen={isOpen}
        appElement={element}
        className="Find_Friend_Modal"
        overlayClassName="Overlay"
      >
        <div className="findFriendModal__body">
          <div className="findFriendModal__search">
            <div className="findFriendModal__searchContainer">
              <IconButton onClick={(e) => search(e)}>
                <SearchOutlined />
              </IconButton>
              <input placeholder="Search for new friends" type="text"
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText} />
            </div>
            <IconButton onClick={() => {
              close();
              setPeople([])
            }}>
              <CancelIcon />
            </IconButton>
          </div>

          <div className="findFriendModal__friends">
            {
              (people.length > 0) && people.map((item, i) => (
                <FriendsSearchList
                  name={item.name}
                  status={item.status}
                  index={i}
                  personId={item._id}
                  user={user}
                />
              ))
            }
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default FindFriend;
